import React from 'react'
// components
import { HexColorPicker } from 'react-colorful'
// utils
import _ from 'lodash'
// styles
import styles from '../CustomizeTemplate.scss'
import classNames from 'classnames/bind'
// constants
import {buttonActions, countdownActions} from '../Constants'
import {Tooltip, OverlayTrigger} from 'react-bootstrap'

const cx = classNames.bind(styles)

export default class ElemCustomizingBar extends React.Component {
  static propTypes = {
    popupElements: React.PropTypes.array,
    elemSidebarOptions: React.PropTypes.object.isRequired,
    visibleElemBar: React.PropTypes.func.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    changeColor: React.PropTypes.func.isRequired,
    selectedPage: React.PropTypes.number.isRequired
  }

  static Input = (({currentElement, elemName, handleChange}) =>
      <div className='form-group'>
        <div className='form-group'>
          <label className='control-label'>Placeholder for {_.head(elemName.split('_'))} input</label>
          <input className='form-control' type='text'
            value={currentElement.placeholder}
            onChange={handleChange.bind(this, elemName, 'placeholder')} />
        </div>
        <div className='form-group'>
          <label className='control-label'>Error message</label>
          <input className='form-control' type='text'
            value={_.get(currentElement, 'validations.required.message')}
            onChange={handleChange.bind(this, elemName, 'message')} />
        </div>
      </div>
  )

  static Button = (({currentElement, elemName, handleChange, buttonActions, changeColor}) =>
      <div className='form-group'>
        <div className='form-group'>
          <label className='control-label'>Text for "{currentElement.text}"</label>
          <input className='form-control'
            value={currentElement.text} type='text'
            onChange={handleChange.bind(this, elemName, 'text')} />
        </div>
        <div className='form-group'>
          <label className='control-label'>Background color:</label>
          <div className={styles['color-picker-wrapper']}>
            <HexColorPicker
              color={_.get(currentElement, 'background_color', '#FFF')}
              onChange={(color) => changeColor({ color }, 'button', elemName, 'background_color')}
            />
            <div className='btn btn-default color-picker-clear'
              onClick={changeColor.bind(this, {color: ''}, 'button', elemName, 'background_color')}>
              <i className='moon-cross3'></i> Clear
            </div>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label'>Text color:</label>
          <div className={styles['color-picker-wrapper']}>
            <HexColorPicker
              color={_.get(currentElement, 'color', '#fff')}
              onChange={(color) => changeColor({ color }, 'button', elemName, 'color')}
            />
            <div className='btn btn-default color-picker-clear'
              onClick={changeColor.bind(this, {color: ''}, 'button', elemName, 'color')}>
              <i className='moon-cross3'></i> Clear
            </div>
          </div>
        </div>
      </div>
  )

  static Countdown = (({currentElement, elemName, handleChange, countdownActions}) =>
      <div>
        <div className='form-group'>
          <label className='control-label'>Time for countdown in seconds</label>
          <input className='form-control' type='number'
            value={currentElement.time}
            onChange={handleChange.bind(this, elemName, 'time')} />
        </div>
      </div>
  )

  static FbLike = (({currentElement, elemName, handleChange}) =>
      <div>
        <div className='form-group'>
          <label className='control-label'>URL of the Facebook page to like</label>
          <OverlayTrigger placement='top'
            overlay={<Tooltip id='url'>Include the full facebook.com page url. EG. https://www.facebook.com/ MyPage</Tooltip>}>
            <input className='form-control' type='text'
              value={currentElement.url}
              onChange={handleChange.bind(this, elemName, 'url')} />
          </OverlayTrigger>
        </div>
      </div>
  )

  render () {
    const {elemSidebarOptions, handleChange, visibleElemBar, popupElements, selectedPage, changeColor} = this.props
    let currentPageElements = {}
    if (popupElements) {
      currentPageElements = popupElements[selectedPage]
    }
    const createCustomizingBar = () => {
      if (elemSidebarOptions.type === 'input') {
        return <ElemCustomizingBar.Input currentElement={currentPageElements[elemSidebarOptions.key]}
          elemName={elemSidebarOptions.key} handleChange={handleChange} />
      } else if (elemSidebarOptions.type === 'button') {
        return <ElemCustomizingBar.Button currentElement={currentPageElements[elemSidebarOptions.key]}
          elemName={elemSidebarOptions.key} handleChange={handleChange}
          buttonActions={buttonActions} changeColor={changeColor} />
      } else if (elemSidebarOptions.type === 'countdown') {
        return <ElemCustomizingBar.Countdown currentElement={currentPageElements[elemSidebarOptions.key]}
          elemName={elemSidebarOptions.key} handleChange={handleChange}
          countdownActions={countdownActions} />
      } else if (elemSidebarOptions.type === 'fb-like') {
        return <ElemCustomizingBar.FbLike currentElement={currentPageElements[elemSidebarOptions.key]}
          elemName={elemSidebarOptions.key} handleChange={handleChange} />
      }
    }
    return (
      <div className={cx('sidebar-default', 'sidebar', 'panel', 'elements-bar', {'open': elemSidebarOptions.open})}
        style={{'left': parseFloat(elemSidebarOptions.position.x) - 150, 'top': parseFloat(elemSidebarOptions.position.y) - 30}}>
        <i />
        <div className={cx('customize-panel-heading')}>
          {_.capitalize(elemSidebarOptions.type)} Settings
          <div onClick={visibleElemBar.bind(this, false)} className={cx('switch-icon')}>
            <span className='moon-cross2' />
          </div>
        </div>
        <div className={cx('panel-body', 'customize-panel-body')}>
          {popupElements && createCustomizingBar()}
        </div>
      </div>
    )
  }
}
