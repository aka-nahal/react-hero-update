import React from 'react'
// components
import { Collapse } from 'react-bootstrap'
import StripeCheckout from 'react-stripe-checkout'
import { toastr } from 'react-redux-toastr'
import Spinner from 'components/Spinner/Spinner'
import Plan from './Plan'
import Order from './Order'
import UpdateCardInfo from '../../Billing/components/steps/UpdateCardInfo'
// utils
import _ from 'lodash'
import moment from 'moment'
import handleResponseErrors from 'utils/handleResponseErrors'

export default class CustomPlan extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    loadCurrentUser: React.PropTypes.func.isRequired,
    params: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired
  }

  static contextTypes = {
    client: React.PropTypes.object.isRequired
  };

  constructor (props) {
    super(...props)

    this.state = {
      customPlanInfo: {},
      togglePanels: {
        plan: { open: true },
        order: { open: false }
      },
      payData: { date: moment(), card: { brand: '', exp_month: '', exp_year: '', last4: '' }, update: false },
      purchaseLoading: false
    }
  }

  componentDidMount () {
    const { location } = this.props
    const { client } = this.context
    client.get(`/plans/${location.query.id}`)
      .then((response) => {
        this.setState({customPlanInfo: response.resource})
      })
      .catch((response) => {
        handleResponseErrors(response, ['base'])
      })
  }

  togglePanel (type) {
    const togglePanels = this.state.togglePanels
    _.each(togglePanels, (item, key) => {
      item.open = key === type
    })
    this.setState({togglePanels: togglePanels})
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
    const { customPlanInfo } = this.state
    const entity = {}
    entity.stripe_card_token = data.id
    entity.plan_id = customPlanInfo.id
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
        toastr.success('', 'Purchase successful')
        this.setPayData(data, false)
        this.setState({purchaseLoading: false})
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
        toastr.success('', 'Subscription to new plan was successful')
        this.setPayData(data, false)
        this.setState({purchaseLoading: false})
        loadCurrentUser()
      })
      .catch((response) => {
        this.setState({purchaseLoading: false})
        handleResponseErrors(response, ['base'])
      })
  }

  render () {
    const { purchaseLoading, togglePanels, payData } = this.state
    const { customPlanInfo } = this.state
    return (
      <div className='content-wrapper'>
        <div className='page-header page-header-default'>
          <div className='page-header-content'>
            <div className='page-title text-left'>
              <h4>
                <i className='fa fa-arrow-circle-o-left position-left' />
                Custom Plan:
              </h4>
            </div>
          </div>
        </div>
        <div className='content text-left'>
          <div className='row'>
            <Collapse in={togglePanels.plan.open}>
              <div className='col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4'>
                <div className='panel panel-body'>
                  {purchaseLoading ? <Spinner />
                  : <div>
                    <Plan customPlanInfo={customPlanInfo} />
                    <div className='text-center'>
                      <StripeCheckout
                        token={::this.createPurchase}
                        stripeKey={__STRIPE_KEY__}
                        panelLabel='Purchase'
                        allowRememberMe>
                        <button type='button' className='btn btn-primary btn-checkout text-uppercase'>
                          Checkout
                        </button>
                      </StripeCheckout>
                    </div>
                  </div>}
                </div>
              </div>
            </Collapse>
            <Collapse in={togglePanels.order.open}>
              <div className='col-sm-12'>
                {payData.update
                  ? <UpdateCardInfo payData={payData} />
                  : <Order selectedPlan={customPlanInfo} payData={payData} />}
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    )
  }
}
