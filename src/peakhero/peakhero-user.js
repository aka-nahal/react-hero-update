export function PeakHeroUser () {
  const storedInfo = localStorage.getItem('peakhero_viewed_popups')
  const viewedPopups = storedInfo ? JSON.parse(storedInfo) : {}

  function isPopupViewed (id) {
    return viewedPopups[id] && (Date.now() - viewedPopups[id]) / 1000 < 60 * 60 * 24
  }

  function setPopupViewed (id) {
    viewedPopups[id] = Date.now()
    localStorage.setItem('peakhero_viewed_popups', JSON.stringify(viewedPopups))
  }

  return {
    isPopupViewed: isPopupViewed,
    setPopupViewed: setPopupViewed
  }
}
