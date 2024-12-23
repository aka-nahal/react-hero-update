import {PeakHeroPopups} from './peakhero-popups'
import {PeakHeroEvents} from './peakhero-events'
import Http from './http'

export function PeakHero (peakHeroAPI) {
  let peakPopups, peakEvents
  let popups = []

  function initialize () {
    if (peakHeroAPI.isLocked()) return false

    deInitialize()
    peakHeroAPI.lock()

    if (getCachePopups()) {
      popups = getCachePopups()
      initOnReady()
    } else {
      Http.get('api/popups')
        .then((response) => {
          popups = response.resources
          cachePopups(popups)
          initOnReady()
        })
        .catch((error) => {
          console.warn('Unable to get popups:', error)
          peakHeroAPI.unlock()
        })
    }
  }

  function initOnReady () {
    document.readyState === 'interactive' || document.readyState === 'complete'
      ? initPopups()
      : document.addEventListener('DOMContentLoaded', initPopups)
  }

  function initPopups () {
    peakPopups = new PeakHeroPopups()
    peakEvents = new PeakHeroEvents(popups, peakPopups)
    peakHeroAPI.unlock()
  }

  function cachePopups (popups) {
    localStorage.setItem('peakhero_cached_popups', JSON.stringify(popups))
    localStorage.setItem('peakhero_cached_at', Date.now())
  }

  function getCachePopups () {
    const cachedPopups = localStorage.getItem('peakhero_cached_popups')
    const cachedAt = localStorage.getItem('peakhero_cached_at')
    if (cachedPopups && cachedAt) {
      const timeSinceCached = (Date.now() - parseInt(cachedAt)) / 1000
      // If cached less than 5 minutes ago
      return timeSinceCached < 60 * 5
        ? JSON.parse(cachedPopups)
        : undefined
    }
  }

  function deInitialize () {
    peakPopups && peakPopups.remove()
    peakEvents && peakEvents.remove()
    peakPopups = null
    peakEvents = null
  }

  function showPopupById (id, force) {
    for (let i = 0; i < popups.length; i++) {
      if (popups[i].id === id) {
        peakPopups.isPopupShown() && !force
          ? console.log('There is another popup already opened')
          : peakPopups.showPopup(popups[i])
        break
      }
    }
  }

  function closeActivePopup () {
    peakPopups.closeActivePopup()
  }

  return {
    initialize: initialize,
    deInitialize: deInitialize,
    showPopup: showPopupById,
    closePopup: closeActivePopup
  }
}
