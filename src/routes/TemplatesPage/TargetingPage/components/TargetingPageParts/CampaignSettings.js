import React from 'react'
// styles
import styles from '../TargetingPage.scss'
import classNames from 'classnames/bind'
// components
import {Tooltip, OverlayTrigger} from 'react-bootstrap'

const cx = classNames.bind(styles)

export const CampaignSettings = ({changeCampaignData, clearErrors, errors, showConnectAppsModal, campaign, fixDomain}) => (
  <div className='panel panel-body'>
    <div className={cx('container-fluid', 'targeting-panel-wrapper')}>
      <div className='col-sm-6 form-horizontal'>
        <div className={cx('form-group', {'has-warning': errors['name']})}>
          <div className='row'>
            <label className='col-sm-3 control-label text-right'>Campaign Name</label>
            <div className='col-sm-8'>
              <input type='text' placeholder='Campaign Name' className='form-control'
                onChange={changeCampaignData.bind(this, 'name')}
                onFocus={clearErrors.bind(this, 'name')}
                value={campaign.name || ''} />
              <small className='help-block'>{errors['name']}</small>
            </div>
          </div>
        </div>
        <div className={cx('form-group', {'has-warning': errors['domain'] && errors['domain'].length})}>
          <div className='row'>
            <label className='col-sm-3 control-label text-right'>Assigned Domain</label>
            <div className='col-sm-8'>
              <OverlayTrigger placement='top'
                overlay={<Tooltip id='domain'>Your site's domain in lowercase letters without "www"<br />(e.g. "mysite.com")</Tooltip>}>
                <input type='text' placeholder='Assigned Domain' className='form-control'
                  onChange={changeCampaignData.bind(this, 'domain')}
                  onFocus={clearErrors.bind(this, 'domain')}
                  onBlur={fixDomain}
                  value={campaign.domain || ''} />
              </OverlayTrigger>
              <small className='help-block'>{errors['domain']}</small>
            </div>
          </div>
        </div>
      </div>
      <div className='col-sm-6'>
        <div className='panel-flat'>
          <div className='panel-heading'>
            Send your subscribers to a mail platform? <br />
            <span className='mail-services-examples'>MailChimp / GetResponse / aWeber / other</span>
          </div>
          <div className='panel-body'>
            <div className='form-group'>
              <button className='btn bg-green' type='button' onClick={() => showConnectAppsModal()}>
                Setup Mail App
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

CampaignSettings.propTypes = {
  changeCampaignData: React.PropTypes.func.isRequired,
  clearErrors: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired,
  showConnectAppsModal: React.PropTypes.func.isRequired,
  campaign: React.PropTypes.object.isRequired
}

export default CampaignSettings
