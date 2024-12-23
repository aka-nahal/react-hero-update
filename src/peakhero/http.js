function request (path, method, data = undefined) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest()
    xhr.open(method, `//${__DEV__ ? 'localhost:3000' : 'converthero.com'}/${path}`, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xhr.send(data ? JSON.stringify(data) : data)

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return
      if (xhr.status !== 200) {
        reject(xhr.statusText)
      } else {
        try {
          const response = JSON.parse(xhr.responseText)
          resolve(response)
        } catch (error) {
          reject(error)
        }
      }
    }
  })
}

export default {
  get: (path) => {
    return request(path, 'GET')
  },
  post: (path, data) => {
    return request(path, 'POST', data)
  },
  put: (path, data) => {
    return request(path, 'PUT', data)
  },
  delete: (path) => {
    return request(path, 'DELETE')
  }
}
