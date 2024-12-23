import {ExitIntentCatcher} from './exit-intent-catcher'
import {PeakHeroUser} from './peakhero-user'

export function PeakHeroEvents (popupsData, peakHeroPopups) {
  const popups = popupsData
  const peakPopups = peakHeroPopups
  const eventsData = {
    clicks: {},
    timeouts: {},
    scrolls: {},
    exitIntents: {}
  }
  const peakUser = new PeakHeroUser()

  bindEventsForPopups()

  function bindEventsForPopups () {
    popups.forEach((popup) => {
      // Skip already viewed popups
      if (peakUser.isPopupViewed(popup.id)) return
      // Iterate over Target Sets
      popup.target_sets.forEach((targetSet) => {
        const actionConditions = targetSet.action_conditions
        const userConditions = targetSet.user_conditions
        const pageConditions = userConditions.on_page
        if (pageConditions.enabled) {
          // adds support for homepage targeting by using single '/' as matcher
          if (window.location.pathname == "/" && pageConditions.pages.indexOf("/") >= 0 ) {
            bindEventsFoPopup(popup, actionConditions)
            return
          }
          // Pages conditions are enabled, check if current page matches pages from target set
          const matchesCurrentPage = pageConditions.pages
            .map((path) => {
              // Convert wildcard mask to regular expression
              const regex = new RegExp(`^${path.replace(/\*/g, '.*').replace(/\?/g, '.{1}')}$`, 'i')
              // Test if current location matches target set (trailing slashes are ignored)
              return regex.test(window.location.pathname.replace(/\/$/, ''))
            })
            .some((testResult) => testResult)
          if (matchesCurrentPage) {
            // Pages conditions suits current page, so we need to bind events
            bindEventsFoPopup(popup, actionConditions)
          }
        } else {
          // Pages conditions are disabled, so we need to bind events
          bindEventsFoPopup(popup, actionConditions)
        }
      })
    })
  }

  function bindEventsFoPopup (popup, actionConditions) {
    if (actionConditions.on_click.enabled) {
      const handler = handlerFunction.bind(undefined, popup)
      // Memorize info about click
      eventsData.clicks[popup.id] = {
        elements: [],
        handler: handler
      }
      // Iterate over selectors
      actionConditions.on_click.selectors.forEach((selector) => {
        // Get elements to bind click to for this selector
        const elements = document.querySelectorAll(selector)
        // Iterate over elements
        for (let i = 0; i < elements.length; i++) {
          elements[i].addEventListener('click', handler)
          eventsData.clicks[popup.id].elements.push(elements[i])
        }
      })
    }

    if (actionConditions.on_timeout.enabled) {
      const handler = handlerFunction.bind(undefined, popup)
      const timeoutId = setTimeout(handler, actionConditions.on_timeout.timeout * 1000)
      // Memorize info about timeout
      eventsData.timeouts[popup.id] = {
        timeoutId: timeoutId
      }
    }

    if (actionConditions.on_scroll_down.enabled) {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      const documentHeight = Math.max(document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight)
      // Value in pixels scrolling below which should trigger popup
      const scrollSizeTrigger = (documentHeight - windowHeight) * actionConditions.on_scroll_down.scroll_size / 100
      const handler = scrollHandlerFunction.bind(undefined, popup, scrollSizeTrigger)
      window.addEventListener('scroll', handler)
      // Memorize info about scroll event handler
      eventsData.scrolls[popup.id] = {
        handler: handler
      }
    }

    if (actionConditions.on_exit_intent.enabled) {
      const handler = handlerFunction.bind(undefined, popup)
      let exitCatcher = ExitIntentCatcher(handler, {delay: 400})
      // Memorize info about timeout
      eventsData.exitIntents[popup.id] = {
        exitIntentCatcher: exitCatcher
      }
    }
  }

  // Separate named function is needed to make removeEventListener possible
  function handlerFunction (popup) {
    if (!peakPopups.isPopupShown()) {
      peakPopups.showPopup(popup)
      unbindEventsForPopup(popup.id)
      peakUser.setPopupViewed(popup.id)
    }
  }

  // Separate named function is needed to make removeEventListener possible
  function scrollHandlerFunction (popup, scrollSizeTrigger) {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop
    if (scrolled >= scrollSizeTrigger) {
      handlerFunction(popup)
    }
  }

  function unbindEventsForPopup (popupId) {
    unbindClick(popupId)
    unbindTimeout(popupId)
    unbindScroll(popupId)
    unbindExitIntents(popupId)
  }

  function unbindClick (popupId) {
    if (eventsData.clicks[popupId]) {
      eventsData.clicks[popupId].elements.forEach((element) => {
        element.removeEventListener('click', eventsData.clicks[popupId].handler)
      })
    }
  }

  function unbindTimeout (popupId) {
    if (eventsData.timeouts[popupId]) {
      clearTimeout(eventsData.timeouts[popupId].timeoutId)
    }
  }

  function unbindScroll (popupId) {
    if (eventsData.scrolls[popupId]) {
      window.removeEventListener('scroll', eventsData.scrolls[popupId].handler)
    }
  }

  function unbindExitIntents (popupId) {
    if (eventsData.exitIntents[popupId]) {
      eventsData.exitIntents[popupId].exitIntentCatcher.remove()
    }
  }

  return {
    remove: function () {
      popups.forEach(popup => unbindEventsForPopup(popup.id))
    }
  }
}
