import React from 'react'
// components
import { toastr } from 'react-redux-toastr'
import LoginForm from 'components/Auth/LoginForm/LoginForm'
import { Link } from 'react-router'
import HeaderInner from 'components/HeaderInner/HeaderInner'
import OAuthButton from 'components/Auth/OAuthButton/OAuthButton'
// utils
import handleResponseErrors from 'utils/handleResponseErrors'

export default class LoginPage extends React.Component {
  static propTypes = {
    login: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
    oAuthActions: React.PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  onSubmit = (data) => {
    const { login } = this.props

    return login(data)
      .then(() => {
        this.successLogin()
      })
      .catch((response) => handleResponseErrors(response))
  }

  successLogin () {
    const { router } = this.context
    toastr.success('', 'You successfully logged in!')
    router.push('/home')
  }

  render () {
    const { oAuthActions } = this.props
    const providers = ['twitter', 'facebook', 'github', 'google']
    return (
      <div className='login-page access-page has-full-screen-bg' >
        <div className='upper-wrapper'>
          <HeaderInner />
          <section className='login-section access-section section'>
            <div className='container'>
              <div className='row'>
                <div className='form-box col-md-8 col-sm-12 col-xs-12 col-md-offset-2 col-sm-offset-0 xs-offset-0'>
                  <div className='form-box-inner'>
                    <h2 className='title text-center'>Log in to ConvertHero</h2>
                    <div className='row'>
                      <div className='form-container col-md-5 col-sm-12 col-xs-12'>
                        <LoginForm onSubmit={this.onSubmit} />
                        <p className='lead text-left'>
                          Don't have a ConvertHero account yet?
                          <br />
                          <Link to='sign-up' className='signup-link'>Create your account now</Link>
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
                                  successAction={::this.successLogin} />
                              </li>
                            )
                          })}
                        </ul>
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
