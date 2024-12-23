import {toastr} from 'react-redux-toastr'
import _ from 'lodash'

export default function handleResponseErrors (response, toastErrors = [], extendKeys = {}) {
  // isString
  if (_.isString(response.error)) {
    toastr.error('Error', response.error)
    const err = {_error: response.error}
    throw err
  }

  // isArray
  if (_.isArray(response.errors)) {
    _.each(response.errors, (err) => toastr.error('', err))
    const err = {_error: response.errors}
    throw err
  }

  // isObject
  if (_.isObject(response.errors)) {
    _.each(toastErrors, (key) => {
      if (response.errors[key] && response.errors[key].length) {
        toastr.error('Error', _.words(_.capitalize(key)).join(' ') + ': ' + response.errors[key].join(', '))
      }
    })
    _.each(extendKeys, (formKey, responseKey) => {
      if (response.errors[responseKey] && response.errors[responseKey].length) {
        response.errors[formKey] = response.errors[formKey] || response.errors[responseKey]
      }
    })
    _.each(response.errors, (error, key) => {
      response.errors[key] = error.join(',' + '; ')
    })

    throw response.errors
  }
}
