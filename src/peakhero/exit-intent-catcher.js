export function ExitIntentCatcher (callback, options) {
  const config = options || {}
  config.sensitivity = config.sensitivity || 20
  config.timer = config.timer || 1000
  config.delay = config.delay || 0

  let _delayTimer = null
  let _html = document.documentElement

  setTimeout(attachEventListeners, config.timer)

  function attachEventListeners () {
    _html.addEventListener('mouseleave', handleMouseleave)
    _html.addEventListener('mouseenter', handleMouseenter)
  }

  function handleMouseleave (e) {
    if (e.clientY > config.sensitivity) return

    _delayTimer = setTimeout(callback, config.delay)
  }

  function handleMouseenter () {
    if (_delayTimer) {
      clearTimeout(_delayTimer)
      _delayTimer = null
    }
  }

  function removeEventListeners () {
    _html.removeEventListener('mouseleave', handleMouseleave)
    _html.removeEventListener('mouseenter', handleMouseenter)
  }

  return {
    remove: removeEventListeners
  }
}
