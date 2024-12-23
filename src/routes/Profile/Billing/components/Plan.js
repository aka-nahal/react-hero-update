import React from 'react'
// styles
import styles from './Biling.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export const Plan = ({price, visits, name, changeStatus, status}) => (
  <div className={cx('plan-wrapper', {'active': status})} onClick={changeStatus}>
    <div className={styles['heading']}>
      <h3 className={styles['title']}>{name}</h3>
      <p className={styles['price-figure']}>
        <span className={styles['price-figure-inner']}>
          <span className={styles['currency']}>$</span>
          <span className={styles['number']}>{price}</span>
          <br />
          <span className={styles['unit']}> per month</span>
        </span>
      </p>
    </div>
    <div className={styles['content']}>
      <ul className={cx('list-unstyled', 'feature-list')}>
        <li><i className='fa fa-check' />VISITS: {visits}</li>
        <li><i className='fa fa-check' />Unlimited Domains</li>
        <li><i className='fa fa-check' />All Templates</li>
        <li><i className='fa fa-check' />All Custom Triggers</li>
        <li><i className='fa fa-check' />Priority Support</li>
      </ul>
    </div>
  </div>
)

Plan.propTypes = {
  price: React.PropTypes.number.isRequired,
  visits: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  changeStatus: React.PropTypes.func.isRequired,
  status: React.PropTypes.bool.isRequired
}

export default Plan
