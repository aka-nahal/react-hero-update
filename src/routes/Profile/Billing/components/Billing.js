import React from 'react'
// components
import { Collapse, Tooltip, OverlayTrigger } from 'react-bootstrap'
import Plans from './steps/Plans'
import Order from './steps/Order'
import UpdateCardInfo from './steps/UpdateCardInfo'
import StripeCheckout from 'react-stripe-checkout'
import { toastr } from 'react-redux-toastr'
import Spinner from 'components/Spinner/Spinner'
// utils
import _ from 'lodash'
import moment from 'moment'
import handleResponseErrors from 'utils/handleResponseErrors'

export default class Billing extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    loadCurrentUser: React.PropTypes.func.isRequired
  }

  static contextTypes = {
    client: React.PropTypes.object.isRequired
  };

  constructor (props) {
    super(...props)

    this.state = {
      basePlans: [],
      promoCode: '',
      plans: {
        starter: { price: 9, active: false },
        basic: { price: 19, active: false },
        plus: { price: 49, active: false },
        pro: { price: 89, active: false },
        agency: { price: 119, active: false }
      },
      yearlyPlanSelected: false,
      togglePanels: {
        plans: { open: true },
        order: { open: false }
      },
      selectedPlan: { name: '', price: 0, selected: false },
      payData: { date: moment(), card: { brand: '', exp_month: '', exp_year: '', last4: '' }, update: false },
      subscriptionInfo: {},
      purchaseLoading: false
    }
  }

  componentDidMount () {
    const { client } = this.context
    const { user } = this.props
    const { plans, selectedPlan } = this.state
    const currentPlanId = _.get(user, 'subscription.plan.stripe_plan_id') || 'trial'
    client.get('/plans')
      .then((response) => {
        this.setState({basePlans: response.resources})
      })

    _.each(plans, (item, key) => {
      item.active = key === currentPlanId || `annual_${key}` === currentPlanId
    })
    selectedPlan.name = currentPlanId.indexOf('annual_') > -1 ? currentPlanId.replace('annual_', '') : currentPlanId
    selectedPlan.price = _.get(plans, `${selectedPlan}.name.price`) || 0
    selectedPlan.selected = selectedPlan.price !== 0
    const yearlyPlanSelected = currentPlanId.indexOf('annual_') > -1
    this.setState({subscriptionInfo: user.subscription, yearlyPlanSelected: yearlyPlanSelected,
      selectedPlan: selectedPlan})
  }

  setPromoCode (e) {
    this.setState({promoCode: e.target.value})
  }

  applyPromoCode () {
    const { promoCode } = this.state
    const { client } = this.context
    const { user, loadCurrentUser } = this.props
    client.post(`/users/${user.id}/coupons/apply_coupon`, {data: {resource: {stripe_coupon_id: promoCode}}})
      .then(() => {
        this.setState({promoCode: ''})
        toastr.success('', 'Coupon code successfully applied')
        loadCurrentUser()
      })
      .catch((response) => toastr.error('Error', response.errors))
  }

  changeStatus (type) {
    const plans = this.state.plans
    _.each(plans, (item, key) => {
      item.active = key === type
    })
    const selectedPlan = {}
    selectedPlan.name = type
    selectedPlan.price = plans[type].price
    selectedPlan.selected = true
    this.setState({plans: plans, selectedPlan: selectedPlan})
  }

  togglePanel (type) {
    const togglePanels = this.state.togglePanels
    _.each(togglePanels, (item, key) => {
      item.open = key === type
    })
    this.setState({togglePanels: togglePanels})
  }

  changeBillingType (value) {
    this.setState({yearlyPlanSelected: value})
  }

  setPayData (data, update) {
    const payData = {}
    payData.date = moment()
    payData.card = _.pick(data.card, 'brand', 'exp_month', 'exp_year', 'last4')
    payData.update = update
    this.setState({payData: payData})
    this.togglePanel('order')
  }

  createPurchase (data) {
    const { user } = this.props
    const { basePlans, selectedPlan, yearlyPlanSelected } = this.state
    const entity = {}
    const purchasedPlanName = yearlyPlanSelected ? `annual_${selectedPlan.name}` : selectedPlan.name
    const currentPlan = _.find(basePlans, {stripe_plan_id: purchasedPlanName})
    entity.stripe_card_token = data.id
    entity.plan_id = currentPlan.id
    if (user.coupon_id) {
      entity.coupon_id = user.coupon_id
    }
    if (!user.subscription.plan.trial_plan) {
      return this.updateSubscription(entity, data)
    }

    this.createSubscription(entity, data)
  }

  createSubscription (entity, data) {
    const { client } = this.context
    const { loadCurrentUser } = this.props
    this.setState({purchaseLoading: true})
    client.post('/subscriptions', {data: {resource: entity}})
      .then((response) => {
        toastr.success('', 'New plan successfully purchased')
        this.setPayData(data, false)
        this.setState({subscriptionInfo: response.resource, purchaseLoading: false})
        loadCurrentUser()
      })
      .catch((response) => {
        this.setState({purchaseLoading: false})
        handleResponseErrors(response, ['base'])
      })
  }

  updateSubscription (entity, data) {
    const { client } = this.context
    const { loadCurrentUser } = this.props
    this.setState({purchaseLoading: true})
    client.put('/subscriptions', {data: {resource: entity}})
      .then((response) => {
        toastr.success('', 'You have been successfully subscribed to the new plan')
        this.setPayData(data, false)
        this.setState({subscriptionInfo: response.resource, purchaseLoading: false})
        loadCurrentUser()
      })
      .catch((response) => {
        this.setState({purchaseLoading: false})
        handleResponseErrors(response, ['base'])
      })
  }

  removeSubscription () {
    const { client } = this.context
    const { loadCurrentUser } = this.props
    const { plans, selectedPlan } = this.state
    const toastrConfirmOptions = {
      onOk: () => client.del('/subscriptions')
        .then((response) => {
          toastr.success('', 'Subscription was successfully canceled')
          _.each(plans, (item) => {
            item.active = false
          })
          selectedPlan.price = 0
          selectedPlan.name = ''
          selectedPlan.selected = false
          this.setState({plans: plans, selectedPlan: selectedPlan, yearlyPlanSelected: false,
            subscriptionInfo: response.resource})
          loadCurrentUser()
        })
        .catch((response) => {
          handleResponseErrors(response, ['base'])
        })
    }
    toastr.confirm('Are you sure?', toastrConfirmOptions)
  }

  updateCardDetails (data) {
    const { client } = this.context
    const { loadCurrentUser, user } = this.props
    const entity = {}
    entity.stripe_card_token = data.id
    this.setState({purchaseLoading: true})
    client.put(`/users/${user.id}/update_card`, {data: entity})
      .then(() => {
        toastr.success('', 'Card details successfully updated')
        this.setState({purchaseLoading: false})
        this.setPayData(data, true)
        loadCurrentUser()
      })
      .catch((response) => {
        this.setState({purchaseLoading: false})
        handleResponseErrors(response, ['base'])
      })
  }

  render () {
    const { subscriptionInfo, purchaseLoading, plans, yearlyPlanSelected, selectedPlan, togglePanels,
      payData, promoCode } = this.state
    const { user } = this.props
    return (
      <div className='content-wrapper'>
        <div className='page-header page-header-default'>
          <div className='page-header-content'>
            <div className='page-title text-left'>
              <h4>
                <i className='fa fa-arrow-circle-o-left position-left' />
                Billing / Subscription:
              </h4>
            </div>
          </div>
        </div>
        <div className='content text-left'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='panel panel-body'>
                <div className='container-fluid'>
                  <div className='row'>
                    <div className='col-sm-12 col-xs-12 col-md-12 col-lg-8'>
                      <div className='col-lg-6 col-md-6 col-sm-6'>
                        <h4>
                          <span className='standout'>Current Plan:</span>&nbsp;
                          {_.toUpper(_.get(subscriptionInfo, 'plan.name') || 'trial')}
                        </h4>
                        <h4>
                          <span className='standout'>Expires:</span> {moment(_.get(subscriptionInfo, 'expires_at')).format('MMM DD YYYY')}
                        </h4>
                        <h4><span className='standout'>Used Impressions:</span> {_.get(subscriptionInfo, 'used_impressions_count')}</h4>
                        <h4><span className='standout'>Status:</span> {_.get(subscriptionInfo, 'status')}</h4>
                      </div>
                      {(_.get(subscriptionInfo, 'last_charged_at') ||
                      _.get(subscriptionInfo, 'next_payment_time')) &&
                        <div className='col-lg-6 col-md-6 col-sm-6'>
                          <h4>Payment Info:</h4>
                          {_.get(subscriptionInfo, 'last_charged_at') && <h5>
                            <span className='standout'>Last Payment Date:</span>&nbsp;
                            {moment(_.get(subscriptionInfo, 'last_charged_at')).format('MMM DD YYYY')}
                          </h5>}
                          {_.get(subscriptionInfo, 'next_payment_time') &&
                            <h5>
                              <span className='standout'>Next Payment Date:</span>&nbsp;
                              {moment(_.get(subscriptionInfo, 'next_payment_time')).format('MMM DD YYYY')}
                            </h5>}
                        </div>
                      }
                    </div>
                    {user.stripe_user_id &&
                      <div className='col-lg-4 col-md-4 col-sm-4 col-sm-offset-4 col-md-offset-4 text-center
                       col-lg-offset-0'>
                        {subscriptionInfo.status !== 'canceled' && !subscriptionInfo.cancel_at_period_end &&
                          <div>
                            <button type='button' className='btn btn-default btn-xlg mb-20'
                              onClick={::this.removeSubscription}>
                              Cancel Subscription
                            </button>
                          </div>}
                        {subscriptionInfo.status !== 'canceled' && subscriptionInfo.cancel_at_period_end &&
                          <div>
                            <OverlayTrigger placement='top'
                              overlay={<Tooltip id='domain'>You still able to use service till the end of the current payment period
                              </Tooltip>}>
                                <label className='label label-default'>Subscription was canceled</label>
                            </OverlayTrigger>
                          </div>}
                        <StripeCheckout
                          token={::this.updateCardDetails}
                          stripeKey={__STRIPE_KEY__}
                          panelLabel='Update Card Details'
                          allowRememberMe={false}>
                          <button type='button' className='btn bg-green btn-xlg'>
                            Update Card Details
                          </button>
                        </StripeCheckout>
                      </div>}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='panel panel-body'>
                <div className='container-fluid'>
                  <div className='row'>
                    {purchaseLoading ? <Spinner />
                    : <Plans plans={plans} changeStatus={::this.changeStatus}
                      yearlyPlanSelected={yearlyPlanSelected} changeBillingType={::this.changeBillingType}
                      planPrice={selectedPlan.price} togglePanel={::this.togglePanel}
                      togglePanels={togglePanels} createPurchase={::this.createPurchase}
                      selectedPlan={selectedPlan.selected} setPromoCode={::this.setPromoCode} promoCode={promoCode}
                      applyPromoCode={::this.applyPromoCode} user={user} />}
                    <Collapse in={togglePanels.order.open}>
                      <div className='col-sm-12'>
                      {payData.update
                        ? <UpdateCardInfo payData={payData} />
                         : <Order selectedPlan={selectedPlan} payData={payData}
                           yearlyPlanSelected={yearlyPlanSelected} user={user} />}
                      </div>
                    </Collapse>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
