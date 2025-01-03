if (typeof window !== 'undefined') {
  (function (window, document, script, url, r, tag, firstScriptTag) {
    window['GoogleAnalyticsObject'] = r
    window[r] = window[r] || function () {
      (window[r].q = window[r].q || []).push(arguments)
    }
    window[r].l = 1 * new Date()
    tag = document.createElement(script)
    firstScriptTag = document.getElementsByTagName(script)[0]
    tag.async = 1
    tag.src = url
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  })(
    window,
    document,
    'script',
    '//www.google-analytics.com/analytics.js',
    'ga'
  )
  const ga = window.ga
  ga('create', 'UA-78259316-1', 'auto')
  module.exports = function () {
    return window.ga.apply(window.ga, arguments)
  }
} else {
  module.exports = function () { console.log(arguments) }
}
