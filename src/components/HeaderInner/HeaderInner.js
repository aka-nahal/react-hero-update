import React from 'react'
import { Link } from 'react-router'
// images
import logo from '../../static/branding/logo.png'

export const HeaderInner = () => (
  <header className='header'>
    <div className='container'>
      <h1 className='logo'>
        <Link to='/'>
          <span>
            <i className='logo-icon' />
            <span className='text'><img src={logo} alt='' className='logo-img' /></span>
          </span>
        </Link>
      </h1>
    </div>
  </header>
)

export default HeaderInner
