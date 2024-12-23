import React from 'react'
// utils
import _ from 'lodash'
// styles
import styles from './PopupPreview.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default class Template extends React.Component {
  static propTypes = {
    templateStyle: React.PropTypes.string,
    template: React.PropTypes.object.isRequired,
    popup: React.PropTypes.object.isRequired,
    sidebarsOpened: React.PropTypes.bool.isRequired,
    backdropHeight: React.PropTypes.any
  }

  render () {
    const { popup, templateStyle, sidebarsOpened, backdropHeight } = this.props
    const backdropStyles = backdropHeight ? _.extend({opacity: _.get(popup, 'settings.backdrop_opacity')}, backdropHeight)
      : {opacity: _.get(popup, 'settings.backdrop_opacity')}
    return (
      <div className='popup-preview-wrapper'>
        <style>
          {popup.css}
          {_.get(popup, 'color_schema.css')}
          {templateStyle}
        </style>
        <div id='backdrop' style={backdropStyles}></div>
        <div id='popup' className={cx({'offset-left': sidebarsOpened})}>
          <div id='popup-container'>
            <div id='popup-animate-container'>
              <div id='popup-content'></div>
              <div id='popup-close'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 31.11 31.11' width='512' height='512'>
                  <polygon points='31.11 1.41 29.7 0 15.56 14.14 1.41 0 0 1.41 14.14 15.56 0 29.7 1.41 31.11 15.56 16.97 29.7 31.11
                     31.11 29.7 16.97 15.56 ' />
                </svg>
              </div>
              <div id='peak-hero-link'>
                <a href='http://converthero.com/?utm_source=popup&utm_medium=popup&utm_campaign=popup'>Powered by ConvertHero</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
