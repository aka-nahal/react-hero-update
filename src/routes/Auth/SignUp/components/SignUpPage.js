import React from 'react'
// components
import SignUpForm from 'components/Auth/SignUpForm/SignUpForm'
import { toastr } from 'react-redux-toastr'
import HeaderInner from 'components/HeaderInner/HeaderInner'
import OAuthButton from 'components/Auth/OAuthButton/OAuthButton'
import { Link } from 'react-router'
// utils
import handleResponseErrors from 'utils/handleResponseErrors'

export default class SignUpPage extends React.Component {
  static propTypes = {
    signUp: React.PropTypes.func.isRequired,
    oAuthActions: React.PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  onSubmit = (data) => {
    const { signUp } = this.props
    data.cart_id = Math.round((Math.pow(36, 128 + 1) - Math.random() * Math.pow(36, 128))).toString(36).slice(1)
    return signUp(data)
      .then(() => {
        _refersion(() => _rfsn._addCart(data.cart_id))
        ga('send', 'event', 'main', 'sign-up', 'trial')
        this.successSignUp()
      })
      .catch((response) => handleResponseErrors(response))
  }

  successSignUp () {
    const { router } = this.context
    toastr.success('', 'You successfully registered')
    router.push('/home')
  }

  render () {
    const { oAuthActions } = this.props
    const providers = ['twitter', 'facebook', 'github', 'google']
    return (
      <div className='signup-page access-page has-full-screen-bg'>
        <div className='upper-wrapper'>
          <HeaderInner />
          <section className='signup-section access-section section'>
            <div className='container'>
              <div className='row'>
                <div className='form-box col-md-8 col-sm-12 col-xs-12 col-md-offset-2 col-sm-offset-0 xs-offset-0'>
                  <div className='form-box-inner'>
                    <h2 className='title text-center'>Sign Up Now</h2>
                    <p className='intro text-center'>Begin collecting leads within minutes.</p>
                    <div className='row'>
                      <div className='form-container col-md-5 col-sm-12 col-xs-12'>
                        <SignUpForm onSubmit={this.onSubmit} />
                        <p className='lead text-left'>
                          Already have an account?
                          <Link to='login' className='login-link'> Log in</Link>
                        </p>
                      </div>
                      <div className='social-btns col-md-5 col-sm-12 col-xs-12 col-md-offset-1 col-sm-offset-0
                        col-sm-offset-0'>
                        <div className='divider'><span>Or</span></div>
                        <ul className='list-unstyled social-login'>
                          {providers.map((item, index) => {
                            return (
                              <li key={index}>
                                <OAuthButton oAuthActions={oAuthActions} provider={item}
                                  successAction={::this.successSignUp} />
                              </li>
                            )
                          })}
                        </ul>
                        <p className='note'>Don't worry, we won't post anything without your permission.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}
