import React from 'react'
// components
import { toastr } from 'react-redux-toastr'
import LoginForm from 'components/Auth/LoginForm/LoginForm'
import OAuthButton from 'components/Auth/OAuthButton/OAuthButton'
// utils
import handleResponseErrors from 'utils/handleResponseErrors'
import _ from 'lodash'

export default class ModalLogin extends React.Component {
  static propTypes = {
    login: React.PropTypes.func.isRequired,
    oAuthActions: React.PropTypes.func.isRequired,
    hideModal: React.PropTypes.func.isRequired,
    showModal: React.PropTypes.func.isRequired,
    modalData: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  onSubmit = (data) => {
    const { login, modalData } = this.props
    data.anonymous_campaign_id = modalData.campaign_id
    return login(data)
      .then(() => {
        this.successLogin()
      })
      .catch((response) => handleResponseErrors(response))
  }

  successLogin () {
    const { hideModal, modalData, showModal } = this.props
    const { router } = this.context
    toastr.success('', 'You have successfully logged in')
    hideModal('login-modal')
    if (modalData.connect_mail_app) {
      return showModal('connect-mail-apps', {campaign_id: modalData.campaign_id})
    }
    router.push(`/campaigns/${modalData.campaign_id}/popups/${modalData.popup_id}/installation`)
  }

  changeModal (e) {
    e.preventDefault()
    const { hideModal, showModal, modalData } = this.props
    hideModal('login-modal')
    showModal('sign-up-modal', modalData)
  }

  render () {
    const { oAuthActions, modalData } = this.props
    const providers = ['twitter', 'facebook', 'github', 'google']
    return (
      <section className='signup-modal access-section section'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='form-box col-md-10 col-md-offset-1'>
              <div>
                <h2 className='title text-center'>Log in to ConvertHero</h2>
                <div className='row'>
                  <div className='form-container col-md-5 col-sm-12 col-xs-12'>
                    <LoginForm onSubmit={this.onSubmit} />
                    <p className='lead text-left'>
                      Don't have a ConvertHero account yet?
                      <br />
                      <a href='#' className='signup-link' onClick={::this.changeModal}>Create your account now</a>
                    </p>
                  </div>
                  <div className='social-btns col-md-5 col-sm-12 col-xs-12 col-md-offset-1 col-sm-offset-0
                        col-sm-offset-0'>
                    <div className='divider'><span>Or</span></div>
                    <ul className='list-unstyled social-login'>
                      {providers.map((item, index) => {
                        return (
                          <li key={index}>
                            <OAuthButton oAuthActions={oAuthActions} successAction={::this.successLogin}
                              provider={item} anonymousCampaignId={_.get(modalData, 'campaign_id')} />
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
    )
  }
}
