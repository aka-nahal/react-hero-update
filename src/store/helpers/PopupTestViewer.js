import {PeakHeroComponents} from 'peakhero/peakhero-components'
import Http from 'peakhero/http'
import _ from 'lodash'

export function PopupTestViewer () {
  let iframeWrap, iframe, iDoc, peakComponents

  const initialize = () => {
    iframeWrap = document.createElement('div')
    document.body.appendChild(iframeWrap)

    iframeWrap.innerHTML =
      `<iframe id="peak-hero-iframe-test" allowtransparency="true" style="display: none;"></iframe>
       <style>
         iframe#peak-hero-iframe-test {
           position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
           width: 100% !important; height: 100% !important; margin: 0 !important; padding: 0 !important; border: 0 !important;
           opacity: 1 !important; z-index: 999999999 !important;
         }
       </style>`

    setTimeout(() => {
      iframe = iframeWrap.getElementsByTagName('iframe')[0]
      iDoc = iframe.contentWindow.document || iframe.contentDocument

      iDoc.body.innerHTML =
        `<meta charset="utf-8">
         <meta name="viewport" content="width=device-width,initial-scale=1">
         <link rel="stylesheet" href="//${__DEV__ ? 'localhost:4000' : 'converthero.com'}/popups/bootstrap-base.min.css">
         <link rel="stylesheet" href="//${__DEV__ ? 'localhost:4000' : 'converthero.com'}/popups/base.css">
         <link rel="stylesheet" href="//${__DEV__ ? 'localhost:4000' : 'converthero.com'}/popups/animate.min.css">
         <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css' rel='stylesheet'
           integrity='sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1' crossorigin='anonymous'>
         <div id="styles"></div>
         <div id="backdrop"></div>
         <div id="popup">
           <div id="popup-container">
             <div id="popup-animate-container">
               <div id="popup-content"></div>
               <div id="popup-close">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.11 31.11" width="512" height="512">
                   <polygon points="31.11 1.41 29.7 0 15.56 14.14 1.41 0 0 1.41 14.14 15.56 0 29.7 1.41 31.11 15.56 16.97 29.7 31.11
                       31.11 29.7 16.97 15.56 "/>
                 </svg>
               </div>
               <div id="peak-hero-link">
                 <a href="//converthero.com/?utm_source=popup&utm_medium=popup&utm_campaign=popup" target="_blank">
                   Powered by ConvertHero
                 </a>
               </div>
             </div>
           </div>
         </div>
         <div id="color-schemas"></div>`
    }, 100)
  }

  const showPopup = (id) => {
    closePopup()

    Http.get(`api/popup_templates/test/${id}`)
      .then((response) => {
        const popupTemplate = response.resource
        const popupContent = iDoc.getElementById('popup-content')
        popupContent.innerHTML = popupTemplate.html
        popupContent.style.backgroundColor = popupTemplate.default_settings.background_color
        if (popupTemplate.default_settings.background_image && popupTemplate.default_settings.background_image.url) {
          popupContent.style.backgroundSize = popupTemplate.default_settings.background_size || 'initial'
          popupContent.style.backgroundRepeat = 'no-repeat'
          popupContent.style.backgroundPosition = 'center center'
          popupContent.style.backgroundImage =
            `url(//${__DEV__ ? 'localhost:3000' : 'converthero.com'}/${popupTemplate.default_settings.background_image.url})`
        } else {
          popupContent.style.backgroundSize = 'initial'
          popupContent.style.backgroundImage = 'none'
        }
        iDoc.getElementById('styles').innerHTML =
          '<style>' + popupTemplate.css + '</style>' +
          (popupTemplate.color_schemas.length ? '<style id="color-schema-style">' + popupTemplate.color_schemas[0].css + '</style>' : '')
        peakComponents = PeakHeroComponents(iDoc, popupTemplate.default_data, popupTemplate.default_settings, closePopup, {testMode: true})
        iDoc.getElementById('popup-close').onclick = closePopup
        iDoc.getElementById('popup-animate-container').className = 'animated ' + popupTemplate.default_settings.appear_animation
        iDoc.getElementById('backdrop').style.opacity = popupTemplate.default_settings.backdrop_opacity
        iframe.style.display = 'block'

        const colorSchemasWrap = iDoc.getElementById('color-schemas')

        colorSchemasWrap.innerHTML = _.map(popupTemplate.color_schemas, (colorSchema) => {
          return `<div class="sch sch-${colorSchema.name.replace(/\s/g, '-')}" style="background: ${colorSchema.color}">
              ${colorSchema.name}</div>`
        }).join('')

        _.forEach(popupTemplate.color_schemas, (colorSchema) => {
          colorSchemasWrap.querySelector(`.sch-${colorSchema.name.replace(/\s/g, '-')}`).onclick = () => {
            iDoc.getElementById('color-schema-style').innerHTML = colorSchema.css
          }
        })
      })
  }

  const closePopup = () => {
    iframe.style.display = 'none'
    iDoc.getElementById('popup-container').className = ''
    iDoc.getElementById('backdrop').style.opacity = 0
    peakComponents && peakComponents.destroy()
  }

  const deInitialize = () => {
    closePopup()
    iframeWrap.remove()
  }

  return {
    initialize: initialize,
    showPopup: showPopup,
    closePopup: closePopup,
    deInitialize: deInitialize
  }
}
