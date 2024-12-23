export let postMessagesInterval
export let messageWindowListener

export function mailAuthRequest (service, user_id) {
  const currentHost = __DEV__ ? 'http://localhost:3000' : window.location.origin
  const defaultError = 'Something went wrong, check your application.'

  return new Promise((resolve, reject) => {
    postMessagesInterval = setInterval(() => {
      popup.postMessage('requestCredentials', currentHost)
    }, 1000)

    messageWindowListener = (e) => {
      if (e.data.type === 'ERROR') {
        clearInterval(postMessagesInterval)
        return reject(e.data.message || defaultError)
      }

      if (e.origin === currentHost) {
        clearInterval(postMessagesInterval)
        return resolve(true)
      }
    }

    window.addEventListener('message', messageWindowListener, false)

    let url = `${currentHost}/api/add_o_auth/${service}?user_id=${user_id}`
    const popup = window.open(url, 'Auth', 'width=1100,height=600,top=100,left=300')
  })
}
