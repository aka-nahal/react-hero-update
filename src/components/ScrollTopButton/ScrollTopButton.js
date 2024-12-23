import React from 'react'
// components
import Scroll from 'react-scroll'
// styles
import styles from './ScrollTopButton.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
const scroll = Scroll.animateScroll

export default class ScrollTopButton extends React.Component {

  static scrollToTop () {
    scroll.scrollToTop()
  }

  constructor (props) {
    super(props)

    this.state = { showButton: false }
    this.handleShowButton = this.handleShowButton.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleShowButton)
  }

  handleShowButton () {
    const scrolled = window.scrollY > 200
    this.setState({ showButton: scrolled })
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleShowButton)
  }

  render () {
    return (
      <div id='topcontrol' className={cx('scroll-button', this.state.showButton && 'visible-button')}
        title='Scroll Back to Top' onClick={ScrollTopButton.scrollToTop}>
        <i className='fa fa-angle-up' />
      </div>
    )
  }
}
