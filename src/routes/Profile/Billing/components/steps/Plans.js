import React from 'react'
// components
import Plan from '../Plan'
import { Collapse } from 'react-bootstrap'
import StripeCheckout from 'react-stripe-checkout'
// utils
import _ from 'lodash'
// styles
import styles from '../Biling.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const plansData = [
  {name: 'starter', visits: '5,000'},
  {name: 'basic', visits: '25,000'},
  {name: 'plus', visits: '100,000'},
  {name: 'pro', visits: '250,000'},
  {name: 'agency', visits: '1,000,000'}
]

export const Plans = ({plans, changeStatus, yearlyPlanSelected, changeBillingType, planPrice, togglePanel,
  togglePanels, createPurchase, selectedPlan, setPromoCode, promoCode, applyPromoCode, user}) => (
  <Collapse in={togglePanels.plans.open}>
    <div className='col-sm-12'>
      <div className='row'>
        {plansData.map((item, index) => {
          return (
            <div className={cx('col-lg-2 col-md-4 col-sm-6 col-xs-12 mb-20', {'col-lg-offset-1': index === 0},
             {'col-md-offset-2 col-lg-offset-0': index === 3}, {'col-sm-offset-3 col-md-offset-0': index === 4})}
              key={index}>
              <Plan name={_.upperCase(item.name)} price={plans[item.name].price} visits={item.visits}
                changeStatus={changeStatus.bind(this, item.name)}
                status={plans[item.name].active} />
            </div>
          )
        })}
        <div className='col-sm-12 text-center'>
          <h1>Bill Me Every:</h1>
          <button type='button' className={`btn ${yearlyPlanSelected ? 'btn-default'
            : 'bg-green'} btn-xlg mr-20`} onClick={changeBillingType.bind(this, false)}>
            1 Month
          </button>
          <button type='button' className={`btn ${yearlyPlanSelected ? 'bg-green'
            : 'btn-default'} btn-xlg`} onClick={changeBillingType.bind(this, true)}>
            12 Month
          </button>
        </div>
        <div className='col-sm-12 text-center mt-20'>
          {user.coupon
            ? <h2>
            Price: {yearlyPlanSelected ? `${(((planPrice * 12) * 0.75) * ((100 - user.coupon.percent_off) * 0.01)).toFixed(2)}$ (-25%)`
            : `${(planPrice * ((100 - user.coupon.percent_off) * 0.01)).toFixed(2)}$`}
            </h2>
            : <h2>
              Price: {yearlyPlanSelected ? `${((planPrice * 12) * 0.75).toFixed(2)}$ (-25%)` : `${planPrice}$`}
            </h2>
          }
        </div>
        <div className='col-sm-12 text-center mt-5 mb-10 form-inline'>
          <h2>Coupon Code</h2>
          <div className='form-group'>
            <input type='text' className='form-control' onChange={setPromoCode} value={promoCode}
              placeholder='Enter coupon code here' />
          </div>
          <button type='button' className='btn bg-green ml-10' onClick={applyPromoCode}>Apply</button>
        </div>
        <div className='col-sm-12 text-center mt-20'>
          <StripeCheckout
            token={createPurchase}
            stripeKey={__STRIPE_KEY__}
            panelLabel='Purchase'
            allowRememberMe
          >
            <button type='button' className='btn btn-primary btn-checkout text-uppercase'
              disabled={!selectedPlan}>
              Checkout
            </button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  </Collapse>
)

Plans.propTypes = {
  plans: React.PropTypes.object.isRequired,
  changeStatus: React.PropTypes.func.isRequired,
  yearlyPlanSelected: React.PropTypes.bool.isRequired,
  changeBillingType: React.PropTypes.func.isRequired,
  planPrice: React.PropTypes.number.isRequired,
  togglePanel: React.PropTypes.func.isRequired,
  createPurchase: React.PropTypes.func.isRequired,
  selectedPlan: React.PropTypes.bool.isRequired,
  setPromoCode: React.PropTypes.func.isRequired,
  promoCode: React.PropTypes.string.isRequired,
  applyPromoCode: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired
}

export default Plans
