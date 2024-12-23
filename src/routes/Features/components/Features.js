import React from 'react'
// components
import { Tabs, Tab } from 'react-bootstrap'
import { Link } from 'react-router'

// images
import { templates, builder, triggers, dashboard } from '../assets/index'

export default class Features extends React.Component {
  render () {
    return (
      <div>
        <div className='headline-bg features-page'>
        </div>
        <section className='features-video section section-on-bg'>
          <div className='container text-center'>
            <h2 className='title'>Take a quick tour to see how it works</h2>
          </div>
        </section>
        <section className='features-tabbed section'>
          <div className='container'>
            <h2 className='title text-center'>ConvertHero Features</h2>
            <div className='row'>
              <div className=' text-center col-md-8 col-sm-10 col-xs-12 col-md-offset-2 col-sm-offset-1
                col-xs-offset-0'>
                <Tabs defaultActiveKey={1} id='features-tabs'>
                  <Tab eventKey={1} title={
                    <span>
                      <i className='fa fa-cloud-upload' />
                      <br />
                      <span className='hidden-sm hidden-xs'>Opt-In Templates</span>
                    </span>
                  }>
                    <div className='tab-pane fade in active' id='feature-1'>
                      <h3 className='title sr-only'>Feature One</h3>
                      <figure className='figure text-center'>
                        <img className='img-responsive' src={templates} alt='' />
                      </figure>
                      <div className='desc text-left'>
                        <p>
                          All our opt-in templates were created by professional designers, with a focus on maximising your e-mail sign ups.
                        </p>
                        <p>
                          You can choose templates ranging from:
                        </p>
                        <ul className='list-unstyled'>
                          <li>
                            <i className='fa fa-star' />
                            <strong>Opt-In Modals</strong>&nbsp;
                            - Show a highly targeted form to your visitors to get them to subscribe to your email list.
                          </li>
                          <li>
                            <i className='fa fa-star' /><strong>Bribe offers</strong> - Offer a visitor a coupon, eBook
                            or link in exchange for their e-mail. Proven to generate more opt-ins.
                          </li>
                          <li>
                            <i className='fa fa-star' /><strong>Full-Screen</strong> - Cover the whole browser screen
                            with your offer.
                          </li>
                        </ul>
                        <p className='text-center'>
                          <Link to='choose-template' className='btn btn-cta btn-cta-primary'>
                            See Our Full Range of Templates Here
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey={2} title={
                    <span>
                      <i className='fa fa-tachometer' />
                      <br />
                      <span className='hidden-sm hidden-xs'>Simple Builder</span>
                    </span>
                  }>
                    <div className='tab-pane' id='feature-2'>
                      <h3 className='title sr-only'>Simple Builder</h3>
                      <figure className='figure text-center'>
                        <img className='img-responsive' src={builder} alt='' />
                      </figure>
                      <div className='desc text-left'>
                        <p>
                          Our focus for the pop-up builder was simplicity with maximum customisability.
                          You have full control to make your popup match your site design and gel with your brand image.
                        </p>
                        <p>
                          You can edit every element on your popup.
                          Change the text, make the headline stand out, change the background color, give it an
                          eye-catching on-show effect.
                        </p>
                        <p>
                          And then, add your new pop-up to your website by copy-and-pasting one line of code.
                        </p>
                        <p className='text-center'>
                          <Link to='choose-template' className='btn btn-cta btn-cta-primary'>
                            You Can View The Builder Here
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey={3} title={
                    <span>
                      <i className='fa fa-photo' />
                      <br />
                      <span className='hidden-sm hidden-xs'>Pop-up Triggers</span>
                    </span>
                  }>
                    <div className='tab-pane' id='feature-3'>
                      <h3 className='title sr-only'>Pop-up Triggers</h3>
                      <figure className='figure text-center'>
                        <img className='img-responsive' src={triggers} alt='' />
                      </figure>
                      <div className='desc text-left'>
                        <p>
                          Choose precisely when you want your pop-up to show
                        </p>
                        <p>
                          Did you know up to 80% of visitors will never return to your website? Capture them with exit intent technology
                        </p>
                        <p>
                          Other options include:
                        </p>
                        <ul className='list-unstyled'>
                          <li><i className='fa fa-star' />
                            <strong>On-Click</strong> - Show an opt-in form when a user clicks a specific button or
                            link on your website
                          </li>
                          <li><i className='fa fa-star' />
                            <strong>After ‘x’ Seconds</strong> - Show the opt-in form on page load, or after 10 seconds.
                          </li>
                          <li><i className='fa fa-star' />
                            <strong>After scrolling ‘x’ percent</strong> - Show your opt-in form after a visitor has
                            engaged with your content. Maybe he’s at the bottom of your blog post, or finished viewing
                            your products on your e-commerce website
                          </li>
                          <li><i className='fa fa-star' />
                            <strong>On exit-intent</strong> - Capture visitors precisely when they are about to leave
                            your website
                          </li>
                        </ul>
                        <p className='text-center'>
                          <Link to='choose-template' className='btn btn-cta btn-cta-primary'>Get Started Here</Link>
                        </p>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey={4} title={
                    <span>
                      <i className='fa fa-users' />
                      <br />
                      <span className='hidden-sm hidden-xs'>Full Reporting</span>
                    </span>
                  }>
                    <div className='tab-pane' id='feature-4'>
                      <h3 className='title sr-only'>Full Reporting</h3>
                      <figure className='figure text-center'>
                        <img className='img-responsive' src={dashboard} alt='' />
                      </figure>
                      <div className='desc text-left'>
                        <p>
                          Our reporting dashboard will give you a breakdown of the results of your campaigns.
                        </p>
                        <p>
                          Measure the results you are getting and adjust your campaigns based on real-time data
                        </p>
                        <p className='text-center'>
                          <Link to='choose-template' className='btn btn-cta btn-cta-primary'>Get Started Here</Link>
                        </p>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
        <section className='steps section'>
          <div className='container'>
            <h2 className='title text-center'>3 Steps To Getting Started</h2>
            <div className='row'>
              <div className='step text-center col-md-4 col-sm-4 col-xs-12'>
                <h3 className='title'><span className='number'>1</span><br /><span className='text'>Choose A Template</span></h3>
                <p>Our pop-up templates are all optimised for the highest opt-in conversion rates. Choose the one that fits your brand.</p>
              </div>
              <div className='step text-center col-md-4 col-sm-4 col-xs-12'>
                <h3 className='title'>
                  <span className='number'>2</span><br /><span className='text'>Customize</span>
                </h3>
                <p>Customize the text, look and feel of your pop-up to suit your website and marketing plan.</p>
              </div>
              <div className='step text-center col-md-4 col-sm-4 col-xs-12'>
                <h3 className='title'>
                  <span className='number'>3</span><br /><span className='text'>Install</span>
                </h3>
                <p>
                  Installation is as easy as copy-and-pasting one line of code.
                </p>
              </div>
            </div>
            <div className='text-center'>
              <Link to='choose-template' className='btn btn-cta btn-cta-primary'>Try It Free</Link>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
