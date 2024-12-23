import React from 'react'
// variables
import { postMessagesInterval, messageWindowListener } from 'store/helpers/oAuthRequest'
// utils
import handleResponseErrors from 'utils/handleResponseErrors'
import _ from 'lodash'

export default class OAuthButton extends React.Component {
  static propTypes = {
    oAuthActions: React.PropTypes.func.isRequired,
    provider: React.PropTypes.string.isRequired,
    successAction: React.PropTypes.func.isRequired,
    anonymousCampaignId: React.PropTypes.string
  };

  constructor (props) {
    super(props)

    this.state = {
      setOAuthRequest: false
    }
  }

  componentWillUnmount () {
    if (this.state.setOAuthRequest) {
      clearInterval(postMessagesInterval)
      window.removeEventListener('message', messageWindowListener)
    }
  }

  oAuthAction () {
    const { oAuthActions, provider, successAction, anonymousCampaignId } = this.props
    const cart_id = Math.round((Math.pow(36, 128 + 1) - Math.random() * Math.pow(36, 128))).toString(36).slice(1)
    oAuthActions(provider, anonymousCampaignId, cart_id).then(() => {
      _refersion(() => _rfsn._addCart(cart_id))
      ga('send', 'event', 'main', 'sign-up', 'trial')
      successAction()
    }).catch((response) => handleResponseErrors(response))
    this.setState({setOAuthRequest: true})
  }

  render () {
    const { provider } = this.props
    return (
      <button className={`${provider}-btn btn`} type='button'
        onClick={::this.oAuthAction}>
        <i className={`fa fa-${provider}`} />Log in with {_.capitalize(provider)}
      </button>
    )
  }
}
