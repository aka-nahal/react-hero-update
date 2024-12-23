import superagent from 'superagent'

export default function authRequest (method, path, data) {
  return new Promise((resolve, reject) => {
    const request = superagent[method](path)

    if (method === 'get') {
      request.query(data)
    }

    if (method === 'post') {
      request.send(data)
    }

    request.end((err, res) => {
      if (err) {
        reject(res.body || err)
      } else {
        if (res.body.resource) {
          res.body.authData = {
            id: res.body.resource.id,
            uid: res.header['uid'],
            client: res.header['client'],
            expiry: res.header['expiry'],
            'access-token': res.header['access-token']
          }
        }
        resolve(res.body)
      }
    })
  })
}
