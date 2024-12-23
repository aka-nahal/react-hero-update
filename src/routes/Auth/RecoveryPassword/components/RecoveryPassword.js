import React from 'react'
// components
import { toastr } from 'react-redux-toastr'
import { Link } from 'react-router'
import RecoveryPasswordForm from 'components/Auth/RecoveryPasswordForm/RecoveryPasswordForm'
import HeaderInner from 'components/HeaderInner/HeaderInner'
// utils
import handleResponseErrors from 'utils/handleResponseErrors'

export default class RecoveryPassword extends React.Component {
  static propTypes = {
    recoveryPassword: React.PropTypes.func.isRequired
  };

  onSubmit = (data) => {
    const { recoveryPassword } = this.props
    return recoveryPassword(data)
      .then(() => {
        toastr.success('', 'Check your email for instructions')
      })
      .catch((response) => handleResponseErrors(response))
  }

  render () {
    return (
      <div className='resetpass-page access-page has-full-screen-bg'>
        <div className='upper-wrapper'>
          <HeaderInner />
          <section className='resetpass-section access-section section'>
            <div className='container'>
              <div className='row'>
                <div className='form-box col-md-6 col-sm-8 col-xs-12 col-md-offset-3 col-sm-offset-2 xs-offset-0'>
                  <div className='form-box-inner'>
                    <h2 className='title text-center'>Recovery Password</h2>
                    <p className='intro'>
                      Please enter your email address below and we'll email you a link to a page where you can easily
                      create a new password.
                    </p>
                    <div className='row'>
                      <div className='form-container'>
                        <RecoveryPasswordForm onSubmit={this.onSubmit} />
                        <p className='lead text-center'>
                          Take me back to the <Link to='login'>login</Link> page
                        </p>
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
