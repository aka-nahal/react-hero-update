import React from 'react'
// components
import { Collapse } from 'react-bootstrap'
import { Link } from 'react-router'
import Scroll from 'react-scroll'

const scroll = Scroll.animateScroll

export default class Pricing extends React.Component {

  static scrollToTop (e) {
    e.preventDefault()
    scroll.scrollToTop()
  }

  constructor (props) {
    super(...props)

    this.state = {
      toggled: {
        first: false,
        second: false,
        third: false,
        fourth: false,
        fifth: false,
        sixth: false,
        seventh: false,
        eights: false
      }
    }
  }

  handleToggled (position, e) {
    e.preventDefault()
    const toggledPanels = {...this.state.toggled}
    toggledPanels[position] = !toggledPanels[position]
    this.setState({toggled: toggledPanels})
  }

  render () {
    const plans = [
      {name: 'Starter', price: 9, impressions: '5,000'},
      {name: 'Basic', price: 19, impressions: '25,000'},
      {name: 'Plus', price: 49, impressions: '100,000'},
      {name: 'Pro', price: 89, impressions: '250,000'},
      {name: 'Agency', price: 119, impressions: '1,000,000'}
    ]

    return (
      <div className='pricing-page'>
        <div className='headline-bg pricing-headline-bg'>
        </div>
        <section className='pricing section section-on-bg'>
          <div className='container'>
            <h2 className='title text-center'>14 day <span className='highlight'>FREE</span> trial with all plans</h2>
            <p className='intro text-center'>
              “Visits” are the amount of times your popup was shown.
              <br />
              Annual billing gives 25% off the selected plan
            </p>
            <div className='price-cols row'>
              <div className='items-wrapper'>
                {plans.map((item, index) => {
                  return (
                    <div className={`item text-center ${index === 2 && 'best-buy'}`} key={index}>
                      <div className='item-inner'>
                        <div className='heading'>
                          <h3 className='title'>{item.name}</h3>
                          <p className='price-figure'>
                        <span className='price-figure-inner'>
                          <span className='currency'>$</span>
                          <span className='number'>{item.price}</span>
                          <br />
                          <span className='unit'> per month</span>
                        </span>
                          </p>
                        </div>
                        <div className='content'>
                          <ul className='list-unstyled feature-list'>
                            <li><i className='fa fa-check' />VISITS: {item.impressions}</li>
                            <li><i className='fa fa-check' />Unlimited Domains</li>
                            <li><i className='fa fa-check' />All Templates</li>
                            <li><i className='fa fa-check' />All Custom Triggers</li>
                            <li><i className='fa fa-check' />Priority Support</li>
                          </ul>
                          <Link to='choose-template' className='btn btn-cta btn-cta-primary'>Start free trial</Link>
                        </div>
                        {index === 2 && <div className='ribbon'>
                          <div className='text'>Popular</div>
                        </div>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
        <section className='faq section has-bg-color'>
          <div className='container'>
            <h2 className='title text-center'>Frequently Asked Questions</h2>
            <div className='row'>
              <div className='col-md-8 col-sm-10 col-xs-12 col-md-offset-2 col-sm-offset-1 col-xs-offset-0 text-left'>
                <div className='panel panel-white'>
                  <div className='panel-heading'>
                    <h4 className='panel-title'>
                      <a href='#' onClick={this.handleToggled.bind(this, 'first')}>
                        <i className={`fa fa-${this.state.toggled.first ? 'minus' : 'plus'}-square`} />
                        Will ConvertHero slow my website down?
                      </a>
                    </h4>
                  </div>
                  <Collapse in={this.state.toggled.first}>
                    <div className='panel-body'>
                      Not at all. We value your sites performance and the ConvertHero script will not cause any delays
                      in your sites loading or performance.
                    </div>
                  </Collapse>
                </div>
                <div className='panel panel-white'>
                  <div className='panel-heading'>
                    <h4 className='panel-title'>
                      <a href='#' onClick={this.handleToggled.bind(this, 'second')}>
                        <i className={`fa fa-${this.state.toggled.second ? 'minus' : 'plus'}-square`} />
                        Do I need coding skills to use ConvertHero?
                      </a>
                    </h4>
                  </div>
                  <Collapse in={this.state.toggled.second}>
                    <div className='panel-body'>
                      We use a drag-and-drop builder and copy and paste integration. No coding skills are required to
                      use ConvertHero.
                    </div>
                  </Collapse>
                </div>
                <div className='panel panel-white'>
                  <div className='panel-heading'>
                    <h4 className='panel-title'>
                      <a href='#' onClick={this.handleToggled.bind(this, 'third')}>
                        <i className={`fa fa-${this.state.toggled.third ? 'minus' : 'plus'}-square`} />
                        What results could I expect?
                      </a>
                    </h4>
                  </div>
                  <Collapse in={this.state.toggled.third}>
                    <div className='panel-body'>
                      This is a tough question to answer.
                      Results of up to 25% have been seen with a well-crafted offer for your visitors but this depends
                      on your website and the goal of your campaign.
                    </div>
                  </Collapse>
                </div>
                <div className='panel panel-white'>
                  <div className='panel-heading'>
                    <h4 className='panel-title'>
                      <a href='#' onClick={this.handleToggled.bind(this, 'fourth')}>
                        <i className={`fa fa-${this.state.toggled.fourth ? 'minus' : 'plus'}-square`} />
                        How does your Free Trial work?
                      </a>
                    </h4>
                  </div>
                  <Collapse in={this.state.toggled.fourth}>
                    <div className='panel-body'>
                      Our 14 day free trial begins when you install the code on your website and begin receiving
                      traffic.
                      You will then have 14 days free of charge to see the results.
                      No Credit Card or special sign-up is required for the free trial. Just test it out!
                    </div>
                  </Collapse>
                </div>
                <div className='panel panel-white'>
                  <div className='panel-heading'>
                    <h4 className='panel-title'>
                      <a href='#' onClick={this.handleToggled.bind(this, 'fifth')}>
                        <i className={`fa fa-${this.state.toggled.fifth ? 'minus' : 'plus'}-square`} />
                        What else is required to use ConvertHero?
                      </a>
                    </h4>
                  </div>
                  <Collapse in={this.state.toggled.fifth}>
                    <div className='panel-body'>
                      A functioning website. Really, that is all. ConvertHero can run on any website.
                    </div>
                  </Collapse>
                </div>
                <div className='panel panel-white'>
                  <div className='panel-heading'>
                    <h4 className='panel-title'>
                      <a href='#' onClick={this.handleToggled.bind(this, 'sixth')}>
                        <i className={`fa fa-${this.state.toggled.sixth ? 'minus' : 'plus'}-square`} />
                        Does ConvertHero support ‘x’ platform? (Wordpress, Shopify, BigCommerce etc.)
                      </a>
                    </h4>
                  </div>
                  <Collapse in={this.state.toggled.sixth}>
                    <div className='panel-body'>
                      Yes. ConvertHero offers integration with any type of website.
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id='cta-section' className='section cta-section text-center pricing-cta-section'>
          <div className='container'>
            <h2 className='title'>Get Started For FREE Today</h2>
            <p className='intro'>No Credit Card Required. Get setup and start collecting e-mails in less than 5 minutes.</p>
            <p>
              <Link to='choose-template' className='btn btn-cta btn-cta-primary'>
                Try ConvertHero Now
              </Link>
            </p>
          </div>
        </section>
      </div>
    )
  }
}
