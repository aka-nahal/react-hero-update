import React from 'react'
// components
import Why from './sectons/Why'
import Cta from './sectons/Cta'
import { Link } from 'react-router'

export default class HomeView extends React.Component {
  static propTypes = {
    showModal: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <div>
        <div className='home-page'>
          <section className='promo section section-on-bg'>
            <div className='container text-center'>
              <h2 className='title'>Convert up to 20% of Visitors to Subscribers</h2>
              <p className='intro'>Add High Converting Popups to Your Site in Minutes Without a Developer</p>
              <p>
                <Link to='choose-template' className='btn btn-cta btn-cta-primary'>
                  Try ConvertHero Free
                </Link>
              </p>
              <p>No Credit Card Required</p>
            </div>
          </section>
        </div>
        <div className='sections-wrapper'>
          <Why />
          <Cta />
        </div>
      </div>
    )
  }
}
