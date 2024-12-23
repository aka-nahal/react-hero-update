import React from 'react'
// images
import { exit_intent, templates, builder, targeting } from '../../assets/index'
// components
import { Link } from 'react-router'

export const Why = () => (
  <section id='why' className='section why'>
    <div className='container'>
      <h2 className='title text-center'>How Can ConvertHero Help You?</h2>
      <p className='intro text-center'>
        Our drag and drop popup builder will have you up and running in minutes
      </p>
      <div className='row item'>
        <div className='content col-md-4 col-sm-12 col-xs-12 text-left'>
          <h3 className='title'>Exit Intent Technology</h3>
          <div className='desc'>
            <p>
              Up to 80% of your visitors will never return to your site.
              Our software detects the exact moment when a visitor is about to leave and allows you to show them a
              targeted offer.
            </p>
          </div>
        </div>
        <figure className='figure col-md-7 col-sm-12 col-xs-12 col-md-offset-1 col-sm-offset-0 col-xs-offset-0 no-margin'
          style={{'marginRight': 0}}>
          <img className='img-responsive' src={exit_intent} alt='' />
        </figure>
      </div>

      <div className='row item'>
        <div className='content col-md-4 col-sm-12 col-xs-12 col-md-push-8 col-sm-push-0 col-xs-push-0 text-left'>
          <h3 className='title'>High Converting Templates</h3>
          <div className='desc'>
            <p>
              We offer the highest converting pre-made opt-in templates for every type of site.
              Fully customize it to suit the look and feel of your brand.
            </p>
          </div>
        </div>
        <figure className='figure col-md-7 col-sm-12 col-xs-12 col-md-pull-4 col-sm-pull-0 col-xs-pull-0 no-margin'>
          <img className='img-responsive' src={templates} alt='' />
        </figure>
      </div>

      <div className='row item '>
        <div className='content col-md-4 col-sm-12 col-xs-12 text-left'>
          <h3 className='title'>Quick And Easy Setup</h3>
          <div className='desc'>
            <p>
              Our fully customisable drag-and-drop builder allows you to create beautiful popups without being a
              developer.
            </p>
            <p>
              Along with our custom platform integrations you will be collecting e-mails within minutes.
            </p>
          </div>
        </div>
        <figure className='figure col-md-7 col-sm-12 col-xs-12 col-md-offset-1 col-sm-offset-0 col-xs-offset-0 no-margin'
          style={{'marginRight': 0}}>
          <img className='img-responsive' src={builder} alt='' />
        </figure>
      </div>

      <div className='row item last-item'>
        <div className='content col-md-4 col-sm-12 col-xs-12 col-md-push-8 col-sm-push-0 col-xs-push-0 text-left'>
          <h3 className='title'>Non-Intrusive Options</h3>
          <div className='desc'>
            <p>
              Customise your popup triggers to avoid frustrating your users.
            </p>
            <p>
              Show your opt-in form only after a user has finished reading your blog post, clicks a link, or intends
              to leave your website.
            </p>
          </div>
        </div>
        <figure className='figure col-md-7 col-sm-12 col-xs-12 col-md-pull-4 col-sm-pull-0 col-xs-pull-0 no-margin'>
          <img className='img-responsive' src={targeting} alt='' />
        </figure>
      </div>

      <div className='feature-lead text-center'>
        <h4 className='title'>Want to discover all the features?</h4>
        <p><Link to='features' className='btn btn-cta btn-cta-secondary'>Take a Tour</Link></p>
      </div>
    </div>
  </section>
)

export default Why
