import superagent from 'superagent'
import { getAuthData } from './authData.js'

const methods = ['get', 'post', 'put', 'patch', 'del']

function formatUrl (path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor (req) {
    if (_ApiClient.instance) {
      return _ApiClient.instance
    }
    methods.forEach((method) => {
      this[method] = (path, { params, data } = {}, { headers } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path))
        const authData = getAuthData()

        if (__DEBUG__) {
          request.set('X-Forwarded-Host', 'localhost:3000')
        }

        if (authData) {
          request.set('access-token', authData['access-token'])
          request.set('token-type', 'Bearer')
          request.set('client', authData.client)
          request.set('uid', authData.uid)
          request.set('expiry', authData.expiry)
        }

        if (params) {
          request.query(params)
        }

        if (data) {
          request.send(data)
        }

        request.end((err, { body, header } = {}) =>
          err ? reject(body || err) : headers ? resolve({ header, body }) : resolve(body)
        )
      })
    })
    _ApiClient.instance = this
  }
}

const ApiClient = _ApiClient

export default ApiClient
