import React from 'react'

export default class Footer extends React.Component {
  render () {
    return (
      <footer className='footer'>
        <div className='footer-content'>
          <div className='container'>
            <div className='row'>
              <div className='footer-col links col-md-offset-3 col-md-4 col-sm-6 col-xs-12'>
                <div className='footer-col-inner'>
                  <h3 className='title'>Navigation</h3>
                  <ul className='list-unstyled'>
                    <li><a href='http://converthero.com/blog'><i className='fa fa-caret-right' />Blog</a></li>
                    <li><a href='http://help.converthero.com/'><i className='fa fa-caret-right' />Knowledgebase</a></li>
                    <li><a href='http://www.converthero.com/login'><i className='fa fa-caret-right' />Login</a></li>
                  </ul>
                </div>
              </div>
              <div className='footer-col links col-md-4 col-sm-6 col-xs-12 sm-break'>
                <div className='footer-col-inner'>
                  <h3 className='title'>Contact us</h3>
                  <p className='email'><i className='fa fa-envelope-o' /><a href='mailto:hello@converthero.com'>
                    hello@converthero.com
                  </a></p>
                </div>
              </div>
              <div className='clearfix'></div>
            </div>
          </div>
        </div>
        <div className='bottom-bar'>
          <div className='container text-center'>
            <small className='copyright'>Copyright @ 2016 <a href='#'>ConvertHero</a></small>
          </div>
        </div>
      </footer>
    )
  }
}
