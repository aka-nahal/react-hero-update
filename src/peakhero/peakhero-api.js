import {PeakHero} from './peakhero'

function PeakHeroAPI () {
  let locked = false
  let urlTrackerIntervalId
  let apiCallsStack = []
  let peakHero

  // This function will handle all requests to API from user
  function apiInterfaceFunction () {
    if (arguments[0] === 'start') {
      // Remove all API calls - they are already needless, because popups should be reinitialized
      apiCallsStack = []
      // If popups are already initializing, let them be
      if (locked) return
    } else if (arguments[0] === 'stop') {
      // Remove all API calls - they are already needless, because popups should be removed
      apiCallsStack = []
    }
    apiCallsStack.push(arguments)
    processStack()
  }

  // Process all instances in API calls stack unless api handler is locked
  function processStack () {
    if (apiCallsStack.length > 0 && !locked) {
      const toProcess = apiCallsStack[0]
      apiCallsStack.splice(0, 1)
      processor(toProcess)
      processStack()
    }
  }

  // Responses for different API calls
  function processor (arr) {
    console.info('ConvertHeroAPI: processing', arr)
    try {
      switch (arr[0]) {
        case 'initialize':
          peakHero.initialize()
          unTrackUrlChanges()
          trackUrlChanges()
          break
        case 'deInitialize':
          peakHero.deInitialize()
          unTrackUrlChanges()
          break
        case 'showPopup':
          peakHero.showPopup(arr[1], arr[2])
          break
        case 'closePopup':
          peakHero.closePopup()
          break
        default:
          console.info('Unknown command', arr)
          break
      }
    } catch (e) {
      console.warn('ConvertHero error:' + e)
    }
  }

  // Periodically checks for URL change and restarts if page was changed
  function trackUrlChanges () {
    var url = urlWithParams()

    urlTrackerIntervalId = setInterval(() => {
      if (url !== urlWithParams()) {
        url = urlWithParams()
        window._convertHero('initialize')
      }
    }, 500)
  }

  function unTrackUrlChanges () {
    clearInterval(urlTrackerIntervalId)
  }

  // Returns current document.location.href without trailing hash (#anchor)
  function urlWithParams () {
    var url = document.location.href
    var hash = document.location.hash || '#'
    return url.replace(new RegExp(hash + '$'), '')
  }

  this.initialize = () => {
    peakHero = new PeakHero(this)
    apiCallsStack = window._convertHero ? (window._convertHero.q || []) : []
    // Override _convertHero with function, which will handle all API calls
    window._convertHero = apiInterfaceFunction
    processStack()
  }

  this.lock = () => {
    locked = true
  }

  this.unlock = () => {
    locked = false
  }

  this.isLocked = () => {
    return locked
  }
}

const peakHeroApi = new PeakHeroAPI()
peakHeroApi.initialize()
