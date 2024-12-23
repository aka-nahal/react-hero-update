import React from 'react'
// styles
import styles from './CustomPlan.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export const Plan = ({customPlanInfo}) => (
  <div className='container-fluid mb-20'>
    <div className='row'>
      <div className={cx('plan-wrapper')}>
        <div className={styles['heading']}>
          <h3 className={styles['title']}>{customPlanInfo.name}</h3>
          <p className={styles['price-figure']}>
            <span className={styles['price-figure-inner']}>
              <span className={styles['currency']}>$</span>
              <span className={styles['number']}>{customPlanInfo.price / 100}</span>
              <br />
              <span className={styles['unit']}> per {customPlanInfo.interval}</span>
            </span>
          </p>
        </div>
        <div className={styles['content']}>
          <ul className={cx('list-unstyled', 'feature-list')}>
            <li><i className='fa fa-check' />VISITS: {customPlanInfo.impressions_count}</li>
            <li><i className='fa fa-check' />Unlimited Domains</li>
            <li><i className='fa fa-check' />All Templates</li>
            <li><i className='fa fa-check' />All Custom Triggers</li>
            <li><i className='fa fa-check' />Priority Support</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

Plan.propTypes = {
  customPlanInfo: React.PropTypes.object.isRequired
}

export default Plan
