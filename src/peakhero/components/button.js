export function setUpButtonComponent (element, settings, actions) {
  element.innerText = settings.text
  element.style.backgroundColor = settings.background_color
  element.style.color = settings.color

  element.onclick = function () {
    actions[settings.action] && actions[settings.action](settings.params)
    if (settings.action !== 'submit') return false
  }
}
