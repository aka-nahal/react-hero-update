import React from 'react'
// components
import OAuthButton from 'components/Auth/OAuthButton/OAuthButton'
import SignUpForm from 'components/Auth/SignUpForm/SignUpForm'
import { toastr } from 'react-redux-toastr'
// utils
import handleResponseErrors from 'utils/handleResponseErrors'
import _ from 'lodash'

export default class ModalSignUp extends React.Component {
  static propTypes = {
    signUp: React.PropTypes.func.isRequired,
    oAuthActions: React.PropTypes.func.isRequired,
    hideModal: React.PropTypes.func.isRequired,
    showModal: React.PropTypes.func.isRequired,
    modalData: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  onSubmit = (data) => {
    const { signUp, modalData } = this.props
    data.cart_id = Math.round((Math.pow(36, 128 + 1) - Math.random() * Math.pow(36, 128))).toString(36).slice(1)
    data.anonymous_campaign_id = modalData.campaign_id
    return signUp(data)
      .then(() => {
        _refersion(() => _rfsn._addCart(data.cart_id))
        ga('send', 'event', 'main', 'sign-up', 'trial')
        this.successSignUp()
      })
      .catch((response) => handleResponseErrors(response))
  }

  successSignUp () {
    const { hideModal, modalData, showModal } = this.props
    const { router } = this.context
    toastr.success('', 'You have successfully registered')
    hideModal('sign-up-modal')
    if (modalData.connect_mail_app) {
      return showModal('connect-mail-apps', {campaign_id: modalData.campaign_id})
    }
    router.push(`/campaigns/${modalData.campaign_id}/popups/${modalData.popup_id}/installation`)
  }

  changeModal (e) {
    e.preventDefault()
    const { hideModal, showModal, modalData } = this.props
    hideModal('sign-up-modal')
    showModal('login-modal', modalData)
  }

  render () {
    const { oAuthActions, modalData } = this.props
    const providers = ['twitter', 'facebook', 'github', 'google']
    return (
      <section className='signup-modal access-section section'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-10 col-md-offset-1'>
              <div>
                <h2 className='title text-center no-margin-top'>Sign Up Now</h2>
                <p className='intro text-center'>Begin collecting leads within minutes.</p>
                <div className='row'>
                  <div className='form-container col-md-5 col-sm-12 col-xs-12'>
                    <SignUpForm onSubmit={this.onSubmit} />
                    <p className='lead text-left'>
                      Already have an account?
                      <a href='#' className='login-link' onClick={::this.changeModal}> Log in</a>
                    </p>
                  </div>
                  <div className='social-btns col-md-5 col-sm-12 col-xs-12 col-md-offset-1 col-sm-offset-0
                        col-sm-offset-0'>
                    <div className='divider'><span>Or</span></div>
                    <ul className='list-unstyled social-login'>
                      {providers.map((item, index) => {
                        return (
                          <li key={index}>
                            <OAuthButton oAuthActions={oAuthActions} successAction={::this.successSignUp}
                              provider={item} anonymousCampaignId={_.get(modalData, 'campaign_id')} />
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
    )
  }
}
