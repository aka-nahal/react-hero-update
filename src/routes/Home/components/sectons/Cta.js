import React from 'react'
// components
import { Link } from 'react-router'

export const Cta = () => (
  <section id='cta-section' className='section cta-section text-center home-cta-section'>
    <div className='container'>
      <h2 className='title'>Get Started For FREE Today</h2>
      <p className='intro'>No Credit Card Required. Get setup and start collecting e-mails in less than 5 minutes.</p>
      <p>
        <Link to='choose-template' id='front-cta-btn' className='btn btn-cta btn-cta-primary'>
          Try ConvertHero Now
        </Link>
      </p>
    </div>
  </section>
)

export default Cta
