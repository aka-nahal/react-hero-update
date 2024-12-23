import {InputValidator} from './input-validator'
import Http from '../http'

export function setUpFormComponent (element, settings, actions, additions) {
  const validator = new InputValidator({skipValidations: additions.options.testMode})

  element.onsubmit = () => {
    let hasErrors = false
    const formInputs = element.querySelectorAll('input:not([type="submit"])')

    for (let i = 0; i < formInputs.length; i++) {
      if (validator.validateInput(formInputs[i]).length) hasErrors = true
    }

    if (!hasErrors) {
      let formData = {}
      for (let j = 0; j < formInputs.length; j++) {
        formData[formInputs[j].name] = formInputs[j].value
      }
      // Skip data submission in test mode
      if (!additions.options.testMode) {
        Http.post('api/conversions', {id: additions.options.popupId, collected_data: formData})
          .catch((error) => {
            console.warn('Unable to send collected data:', error)
          })
      }
      actions.next_page()
    }
    return false
  }
}
