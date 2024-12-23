import _ from 'lodash'

export let postMessagesInterval
export let messageWindowListener

export function oAuthRequest (strategy, campaign_id, cart_id) {
  if (strategy === 'google') strategy = 'google_oauth2'
  const currentHost = __DEV__ ? 'http://localhost:3000' : window.location.origin
  const defaultError = 'Something went wrong, check your application.'

  return new Promise((resolve, reject) => {
    postMessagesInterval = setInterval(() => {
      popup.postMessage('requestCredentials', currentHost)
    }, 1000)

    messageWindowListener = (e) => {
      if (e.data.type === 'ERROR' || !e.data['auth_token']) {
        clearInterval(postMessagesInterval)
        return reject(e.data.message || defaultError)
      }

      if (e.origin === currentHost) {
        const response = {}
        response.resource = _.pick(e.data,
          ['id', 'email', 'first_name', 'last_name', 'phone']
        )
        response.resource.full_name = `${e.data.first_name} ${e.data.last_name}`
        response.authData = {
          id: e.data.id,
          uid: e.data.uid,
          client: e.data['client_id'],
          expiry: e.data['expiry'],
          'access-token': e.data['auth_token'],
          provider: e.data['provider']
        }
        clearInterval(postMessagesInterval)
        return resolve(response)
      }
    }

    window.addEventListener('message', messageWindowListener, false)

    let url = `${currentHost}/api/auth/${strategy}?omniauth_window_type=newWindow&omniauth_window_type=newWindow&cart_id=${cart_id}`
    if (campaign_id) {
      url += `&omniauth_window_type=newWindow&anonymous_campaign_id=${campaign_id}`
    }
    const popup = window.open(url, 'Auth', 'width=1100,height=600,top=100,left=300')
  })
}
