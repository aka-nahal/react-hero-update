import _ from 'lodash'

export default function uploadData (data, resource) {
  let formData = new FormData()
  _.each(data, (value, key) => {
    if (value) {
      resource ? formData.append(`resource[${key}]`, value) : formData.append(key, value)
    }
  })

  return formData
}
