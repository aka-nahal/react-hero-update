export function InputValidator (options) {
  const skipValidations = options && options.skipValidations

  function setValidationError (input, message) {
    input.className += ' validation-error'
    input.parentNode.className += ' has-error'
    input.parentNode.querySelector('.validation-error-message').innerText = message
  }

  function unSetValidationErrors (input) {
    input.className = input.className.replace(/validation\-error/g, '')
    input.parentNode.className = input.parentNode.className.replace(/has\-error/g, '')
    const errorMessages = input.parentNode.querySelectorAll('.validation-error-message')
    for (let i = 0; i < errorMessages.length; i++) {
      errorMessages[i].innerText = ''
    }
  }

  return {
    validateInput: (input) => {
      if (skipValidations) return []

      unSetValidationErrors(input)
      const errors = []
      const emailRegexp = /^[^@]+@([^@\.]+\.)+[^@\.]+$/

      if (input.getAttribute('data-required-message') && input.value.trim().length === 0) {
        errors.push(input.getAttribute('data-required-message'))
      }
      if (input.value && input.getAttribute('data-email-message') && !input.value.trim().match(emailRegexp)) {
        errors.push(input.getAttribute('data-email-message'))
      }

      if (errors.length) setValidationError(input, errors.join('. '))
      return errors
    }
  }
}
