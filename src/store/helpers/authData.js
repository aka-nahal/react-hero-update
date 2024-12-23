export function setAuthData (data) {
  if (data) {
    localStorage['id'] = data.id
    localStorage['access-token'] = data['access-token']
    localStorage['uid'] = data.uid
    localStorage['client'] = data.client
    localStorage['expiry'] = data.expiry
    localStorage['provider'] = data.provider
  }
}

export function getAuthData () {
  return {
    id: localStorage['id'],
    uid: localStorage['uid'],
    'access-token': localStorage['access-token'],
    client: localStorage['client'],
    expiry: localStorage['expiry'],
    provider: localStorage['provider']
  }
}

export function clearData () {
  localStorage.removeItem('access-token')
  localStorage.removeItem('id')
  localStorage.removeItem('uid')
  localStorage.removeItem('client')
  localStorage.removeItem('expiry')
  localStorage.removeItem('provider')
}
