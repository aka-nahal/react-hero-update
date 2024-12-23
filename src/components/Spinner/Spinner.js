import React from 'react'
import styles from './Spinner.css'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export const Spinner = () => {
  return (
    <div className={cx('sk-folding-cube')}>
      <div className={cx('sk-cube1', 'sk-cube')}></div>
      <div className={cx('sk-cube2', 'sk-cube')}></div>
      <div className={cx('sk-cube4', 'sk-cube')}></div>
      <div className={cx('sk-cube3', 'sk-cube')}></div>
    </div>
  )
}

export default Spinner
