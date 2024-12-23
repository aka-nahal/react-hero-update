import {InputValidator} from './input-validator'

export function setUpInputComponent (element, settings, actions, additions) {
  const validator = new InputValidator({skipValidations: additions.options.testMode})
  element.setAttribute('placeholder', settings.placeholder)
  element.setAttribute('name', settings.name)

  // insert label before input for IE browsers
  if (/MSIE ((8|9)+[.0-9]*)/g.test(navigator.userAgent)) {
    const label = document.createElement('label')
    label.innerHTML = settings.placeholder
    const parentElement = element.parentNode
    parentElement.className += ' ie9'
    parentElement.insertBefore(label, element)
  }

  // Append validation error message block
  const errorMessageBlock = additions.document.createElement('span')
  errorMessageBlock.className = 'help-block validation-error-message'
  element.parentNode.insertBefore(errorMessageBlock, element.nextSibling)

  // Set validation error messages data
  if (settings.validations.required && settings.validations.required.enabled) {
    element.setAttribute('data-required-message', settings.validations.required.message || ' ')
  }
  if (settings.validations.email && settings.validations.email.enabled) {
    element.setAttribute('data-email-message', settings.validations.email.message || ' ')
  }

  // Set events
  let isVisited = false
  element.onchange = () => {
    if (isVisited) validator.validateInput(element)
  }
  element.onkeyup = () => {
    if (isVisited) validator.validateInput(element)
  }
  element.onblur = () => {
    isVisited = true
    validator.validateInput(element)
  }
}
