import React from 'react'
// components
import { toastr } from 'react-redux-toastr'
import { Link } from 'react-router'
import ChangePasswordForm from 'components/Auth/ChangePasswordForm/ChangePasswordForm'
import HeaderInner from 'components/HeaderInner/HeaderInner'
// utils
import handleResponseErrors from 'utils/handleResponseErrors'

export default class ChangePasswordPage extends React.Component {
  static propTypes = {
    resetPassword: React.PropTypes.func.isRequired,
    loadCurrentUser: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired,
    user: React.PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidMount () {
    const { location, loadCurrentUser, user } = this.props
    if (!user) {
      const data = {
        'client': location.query.client_id,
        'uid': location.query.uid,
        'access-token': location.query.token
      }
      loadCurrentUser(data)
    }
  }

  onSubmit = (data) => {
    const { resetPassword, location } = this.props
    const { router } = this.context
    data.reset_password_token = location.query.reset_password_token
    return resetPassword(data)
      .then(() => {
        toastr.success('', 'Your password successfully changed!')
        router.push('/')
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
                    <h2 className='title text-center'>Change Password</h2>
                    <p className='intro'>
                      Please enter a new password and press confirm to change your password.
                    </p>
                    <div className='row'>
                      <div className='form-container'>
                        <ChangePasswordForm onSubmit={this.onSubmit} />
                        <p className='lead text-center'>
                          Take me back to the <Link to='recovery-password'>Recovery password</Link> page
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
