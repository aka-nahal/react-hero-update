export function setUpImageComponent (element, settings) {
  element.src = `//${__DEV__ ? 'localhost:3000' : 'converthero.com'}/${settings.url}`
}
