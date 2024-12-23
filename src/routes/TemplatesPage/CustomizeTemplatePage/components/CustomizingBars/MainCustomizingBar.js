import React from 'react'
// components
import Select from 'react-select'
import { HexColorPicker } from 'react-colorful'
// styles
import styles from '../CustomizeTemplate.scss'
import classNames from 'classnames/bind'
// utils
import _ from 'lodash'
// constants
import { animations, backgroundSizes } from '../Constants'

const cx = classNames.bind(styles)

export default class MainCustomizingBar extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool.isRequired,
    popup: React.PropTypes.object.isRequired,
    colorSchemas: React.PropTypes.array.isRequired,
    changeDisplayEffect: React.PropTypes.func.isRequired,
    changeBackdropOpacity: React.PropTypes.func.isRequired,
    changeColorSchema: React.PropTypes.func.isRequired,
    currentColorScheme: React.PropTypes.object,
    toggleEditor: React.PropTypes.func.isRequired,
    toggleMainBar: React.PropTypes.func.isRequired,
    changeColor: React.PropTypes.func.isRequired,
    background: React.PropTypes.string,
    uploadPopupBackgroundImage: React.PropTypes.func.isRequired,
    changePopupBackgroundSize: React.PropTypes.func.isRequired,
    removePopupBackgroundImage: React.PropTypes.func.isRequired
  }

  render () {
    const { open, popup, colorSchemas, changeDisplayEffect, changeBackdropOpacity, changeColorSchema, toggleMainBar,
      toggleEditor, background, changeColor, uploadPopupBackgroundImage, changePopupBackgroundSize,
      removePopupBackgroundImage } = this.props
    return (
      <div className={cx('sidebar', 'panel', 'customizing-bar', 'general-bar', {'open': open})}>
        <div className={styles['customize-panel-heading']}>
          General Settings
          <div onClick={toggleMainBar} className={cx('switch-icon')}>
            <span className='fa fa-chevron-left' />
          </div>
        </div>
        <div className={cx('panel-body', 'customize-panel-body')}>
          <div className='form-group'>
            <label className='control-label'>Display effect:</label>
            <Select
              name='display-effect'
              placeholder='Select display effect'
              options={animations}
              value={_.get(popup, 'settings.appear_animation') || ''}
              onChange={(e) => changeDisplayEffect(e)}
            />
          </div>
          <div className='form-group'>
            <label className='control-label'>Backdrop opacity:</label>
            <input type='range' value={_.get(popup, 'settings.backdrop_opacity') || '0'} min='0' max='1' step='0.01'
              onChange={(e) => changeBackdropOpacity(e)} />
          </div>
          <div className={cx('form-group pb-5', 'color-theme-wrapper')}>
            <label className='control-label'>Color Theme:</label>
            <div className='container-fluid'>
              <div className='row'>
                <div className={styles['customize-color-theme']}>
                  {colorSchemas && colorSchemas.map((item, index) => {
                    return (
                      <div className={cx('col-sm-2 col-xs-2', {'active': item.id === popup.color_schema_id})}
                        key={index} title={item.name}>
                        <span style={{backgroundColor: item.color}} onClick={changeColorSchema.bind(this, item)} />
                      </div>
                      )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label'>Background color:</label>
            <div className={styles['color-picker-wrapper']}>
              <HexColorPicker
                color={background || '#fff'}
                onChange={(color) => changeColor({ color })}
              />
              <div className='btn btn-default color-picker-clear' onClick={changeColor.bind(this, {color: ''})}>
                <i className='moon-cross3'></i> Clear
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label'>Background image:</label>
            <div className='input-group'>
              <div className='form-control file-caption  kv-fileinput-caption' style={{height: '34px'}}>
                <div className='file-caption-name' style={{maxHeight: '20px'}} >
                  {_.get(popup, 'settings.background_image.url') && <i className='moon-file-check' />}
                  {_.last(_.get(popup, 'settings.background_image.url', '').split('/'))}
                </div>
              </div>
              <div className='input-group-btn'>
                {_.get(popup, 'settings.background_image.url') &&
                  <button className='btn btn-default fileinput-remove fileinput-remove-button' style={{padding: '6px'}}
                    onClick={removePopupBackgroundImage}>
                    <i className='moon-cross3' />
                    <span className={cx('hidden-xs', 'upload-text')}>Remove</span>
                  </button>}
                <button className='btn btn-primary btn-file' style={{padding: '6px'}}>
                  <i className='moon-file-plus mr-5' />
                  <span className={cx('hidden-xs', 'upload-text')}>Browse</span>
                  <input type='file' className='file-input' onChange={uploadPopupBackgroundImage} />
                </button>
              </div>
            </div>
          </div>
          {_.get(popup, 'settings.background_image.url') && <div className='form-group'>
            <label className='control-label'>Background size:</label>
            <Select
              name='background-size'
              placeholder='Select size'
              options={backgroundSizes}
              value={_.get(popup, 'settings.background_size') || ''}
              clearable={false}
              onChange={changePopupBackgroundSize}
            />
          </div>}
          <div className='text-center'>
            <a href='#' onClick={toggleEditor}>CSS editor</a>
          </div>
          <div>
            <div style={{ margin: '20px 20px 20px', textAlign: 'center' }}>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
