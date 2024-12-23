import React from 'react'
// components
import Select from 'react-select'
// styles
import styles from '../CustomizeTemplate.scss'
import classNames from 'classnames/bind'
// utils
import _ from 'lodash'
// constants
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import { buttonActions } from '../Constants'

const cx = classNames.bind(styles)

export default class OtherSettingsBar extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool.isRequired,
    toggleOtherSettingsBar: React.PropTypes.func.isRequired,
    popup: React.PropTypes.object.isRequired,
    changeAction: React.PropTypes.func.isRequired
  }

  render () {
    const { open, toggleOtherSettingsBar, popup, changeAction } = this.props
    const finishAction = _.get(popup, 'settings.finish_action')
    return (
      <div className={cx('sidebar', 'panel', 'customizing-bar', 'other-settings-bar', {'open': open})}>
        <div className={styles['customize-panel-heading']}>
          Other Settings
          <div onClick={toggleOtherSettingsBar} className={cx('switch-icon')}>
            <span className='fa fa-chevron-left' />
          </div>
        </div>
        <div className={cx('panel-body', 'customize-panel-body')}>
          <div className='form-group'>
            <label className='control-label'>What to do in the end</label>
            <Select
              name='choose-button-action'
              placeholder='Select action'
              options={buttonActions}
              value={_.get(finishAction, 'action', '')}
              clearable={false}
              onChange={changeAction.bind(this, 'action')}
            />
          </div>
          {finishAction && finishAction.action === 'redirect' && <div className='form-group'>
            <label className='control-label'>URL</label>
            <OverlayTrigger placement='top'
              overlay={<Tooltip id='domain'>Full URL of the page where visitor will be redirected to after clicking
               the last button on the popup
              (e.g. "http://google.com")</Tooltip>}>
              <input className='form-control' type='text'
                value={_.get(finishAction, 'params', '')}
                onChange={changeAction.bind(this, 'params')} />
            </OverlayTrigger>
          </div>}
          {finishAction && finishAction.action === 'go_to_page' && <div className='form-group'>
            <label className='control-label'>Page index</label>
            <input className='form-control' type='number'
              value={_.get(finishAction, 'params', 0)}
              onChange={changeAction.bind(this, 'params')} />
          </div>}
        </div>
      </div>
    )
  }
}
