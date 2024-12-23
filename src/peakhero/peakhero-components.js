// pagesData {Array[Object]} Data for components on each page.
//  Object key - Component name
//  Object value - Data to set up component
//
//    text (Any block of text)
//      text {String} HTML of the block
//
//    button (Any block that should react on click)
//      text {String} Inner text of the block
//      action {String} Name of the action to perform:
//        'close_popup' - Closes popup
//        'next_page' - Displays next page of the popup (could also perform final action provided in Popup's settings
//                      instead of showing last page)
//        'go_to_page' - Shows page specified by passed parameter. Accepts zero-based-index of the page to go
//        'submit' - Does nothing (click on button will automatically submit the form)
//        'redirect' - Changes current window location to url specified by parameter. Accepts redirect URL
//        'finish' - According closes popup or performs and action from settings.finish_action
//      params {Any} Params to pass inside the action handler (if supported by action)
//
//    input (Text input)
//      placeholder {String} Placeholder of the input
//      name {String} Name of the input
//      validations {Object} Describes how to validate input:
//        Object key - Validation name
//        Object value - Validation settings
//
//        required (Validates presence of value in input)
//          message {String} Error message to display if value is blank
//
//        email (Validates that value is valid email)
//          message {String} Error message to display if value is not valid email
//
//    form (Form with inputs to collect data and send them to server)
//
//    countdown (Countdown timer)
//      time {Integer} Time in seconds which will be displayed by timer
//      action {String} Name of the action to perform (same as for a button component)
//      params {Any} Params to pass inside the action handler (if supported by action)

import {setUpTextComponent} from './components/text'
import {setUpButtonComponent} from './components/button'
import {setUpInputComponent} from './components/input'
import {setUpFormComponent} from './components/form'
import {setUpCountdownComponent} from './components/countdown'
import {setUpImageComponent} from './components/image'
import {setUpFbLikeComponent} from './components/fb-like'

export function PeakHeroComponents (targetDocument, pagesData, popupSettings, closeFunc, options) {
  const iDoc = targetDocument
  let currentPage = 0
  options = options || {}
  let intervals = []

  const setUpFunctions = {
    text: setUpTextComponent,
    button: setUpButtonComponent,
    input: setUpInputComponent,
    form: setUpFormComponent,
    countdown: setUpCountdownComponent,
    image: setUpImageComponent,
    'fb-like': setUpFbLikeComponent
  }

  const actions = {
    close_popup: () => {
      closeFunc()
    },
    next_page: () => {
      currentPage++
      showPage(currentPage)
    },
    go_to_page: (page) => {
      currentPage = page
      showPage(currentPage)
    },
    submit: () => {
    },
    redirect: (url) => {
      window.location.href = url
    },
    finish: () => {
      const finishAction = popupSettings.finish_action
      if (finishAction && finishAction.action === 'redirect') {
        window.location.href = finishAction.params
      } else closeFunc()
    }
  }

  setUpPages()

  function setUpPages () {
    pagesData.forEach((pageData, i) => {
      const pageElement = iDoc.querySelector('[page="' + i + '"]')
      setUpComponents('text', pageElement, pageData)
      setUpComponents('button', pageElement, pageData)
      setUpComponents('input', pageElement, pageData)
      setUpComponents('form', pageElement, pageData)
      setUpComponents('countdown', pageElement, pageData)
      setUpComponents('image', pageElement, pageData)
      setUpComponents('fb-like', pageElement, pageData)
    })
    showPage(currentPage)
  }

  function showPage (page) {
    pagesData.forEach((pageData, i) => {
      const pageElement = iDoc.querySelector('[page="' + i + '"]')
      pageElement.style.display = i === page ? '' : 'none'
    })
  }

  function setUpComponents (type, container, data) {
    const components = container.querySelectorAll('[' + type + ']')
    for (let i = 0; i < components.length; i++) {
      const element = components[i]
      const settings = data[element.getAttribute(type)]
      const additions = {document: iDoc, intervals: intervals, options: options}
      setUpFunctions[type](element, settings, actions, additions)
    }
  }

  return {
    destroy: function () {
      intervals.forEach((intervalId) => {
        clearInterval(intervalId)
      })
    }
  }
}
