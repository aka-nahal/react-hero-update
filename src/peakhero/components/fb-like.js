import Http from '../http'

export function setUpFbLikeComponent (element, settings, actions, additions) {
  const componentId = element.getAttribute('fb-like')
  const src =
    `https://www.facebook.com/plugins/like.php?href=${encodeURIComponent(settings.url || window.location.href)}&locale=en_US&` +
    `layout=button&action=like&share=false&appId=${__FB_APP_ID__}`

  element.innerHTML = `<iframe src=${src} width="50" height="20" style="border:none; overflow:hidden" scrolling="no" frameborder="0" 
                        allowTransparency="true" data-component-id="${componentId}"></iframe>`

  additions.document.body.focus()

  const interval = setInterval(() => {
    var elem = additions.document.activeElement
    if (elem && elem.tagName === 'IFRAME' && elem.getAttribute('data-component-id') === componentId) {
      clearInterval(interval)
      // Need to wait a little, otherwise like will not be added
      setTimeout(() => {
        // Skip data submission in test mode
        if (!additions.options.testMode) {
          Http.post('api/conversions', {id: additions.options.popupId})
            .catch((error) => {
              console.warn('Unable to send collected data:', error)
            })
        }
        actions[settings.action] && actions[settings.action](settings.params)
      }, 500)
    }
  }, 100)
}
