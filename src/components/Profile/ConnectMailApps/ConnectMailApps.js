import React from 'react'
// components
import Select from 'react-select'
import {toastr} from 'react-redux-toastr'
// variables
import {postMessagesInterval, messageWindowListener} from 'store/helpers/mailAuthRequest'
import {mailServices, integrationTypes} from './Constants'
// utils
import _ from 'lodash'
import handleResponseErrors from 'utils/handleResponseErrors'

export default class ConnectMailApps extends React.Component {
  static propTypes = {
    hideModal: React.PropTypes.func.isRequired,
    getCampaigns: React.PropTypes.func.isRequired,
    saveIntegration: React.PropTypes.func.isRequired,
    mailAuthActions: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired,
    campaigns: React.PropTypes.array,
    campaign: React.PropTypes.object,
    campaign_id: React.PropTypes.any,
    integration: React.PropTypes.object,
    updateIntegration: React.PropTypes.func
  }

  constructor (props) {
    super(...props)

    this.state = {
      selectedCampaign: '',
      mailAppData: {},
      visibleIntegrationFields: [],
      errors: {}
    }
    this.integrationFields = ['api_url', 'api_key', 'list_id', 'site_id', 'secret_key', 'token', 'username',
      'infusion_id', 'user_email', 'admin_url', 'campaign', 'type', 'app_identifier', 'app_pass', 'campaign_id']
    this.oauthServices = ['ConstantContactIntegration', 'AweberIntegration']
  }

  componentDidMount () {
    const {campaigns, getCampaigns, campaign, campaign_id, integration} = this.props
    const mailAppData = this.state.mailAppData
    if (_.isEmpty(campaigns)) {
      getCampaigns()
    }
    if (!_.isEmpty(campaign) && campaign_id) {
      mailAppData.campaign_id = campaign.id
      this.setState({selectedCampaign: campaign, mailAppData: mailAppData})
    }
    if (integration) {
      mailAppData.campaign_id = integration.campaign.id
      mailAppData.type = integration.type
      mailAppData.api_key = integration.integration_data.api_key
      mailAppData.list_id = integration.integration_data.list_id
      mailAppData.token = integration.integration_data.token
      this.setState({selectedCampaign: integration.campaign, mailAppData: mailAppData})
      this.setVisibleIntegrationFields()
    }
  }

  componentWillUnmount () {
    clearInterval(postMessagesInterval)
    window.removeEventListener('message', messageWindowListener)
  }

  setVisibleIntegrationFields () {
    const {mailAppData} = this.state
    let {visibleIntegrationFields} = this.state
    visibleIntegrationFields = integrationTypes[mailAppData.type]
    this.setState({visibleIntegrationFields: visibleIntegrationFields})
  }

  handleChangeCampaign (campaign) {
    this.state.mailAppData.campaign_id = campaign.id
    this.setState({selectedCampaign: campaign, mailAppData: this.state.mailAppData})
  }

  handleChangeService (service) {
    const mailAppData = this.state.mailAppData
    mailAppData.type = service.value
    this.setState({mailAppData: mailAppData})
    this.setVisibleIntegrationFields()
  }

  handleChangeInput (type, e) {
    const mailAppData = this.state.mailAppData
    mailAppData[type] = e.target.value
    this.setState({mailAppData: mailAppData})
  }

  connectMailApp () {
    const {hideModal, saveIntegration} = this.props
    saveIntegration(this.state.mailAppData)
      .then(() => {
        hideModal('connect-mail-apps')
        toastr.success('', 'Connecting mail app was successful!')
      })
      .catch((response) => {
        this.setState({errors: response.errors || {}})
        handleResponseErrors(response, this.integrationFields.concat(['campaign', 'type', 'campaign_id']))
      })
  }

  updateMailApp () {
    const {updateIntegration, integration, hideModal} = this.props
    updateIntegration(integration.id, this.state.mailAppData)
      .then(() => {
        hideModal('connect-mail-apps')
        toastr.success('', 'Updating mail app was successful!')
      })
      .catch((response) => {
        this.setState({errors: response.errors || {}})
        handleResponseErrors(response, this.integrationFields.concat(['campaign', 'type', 'campaign_id']))
      })
  }

  clearErrors (type) {
    if (this.state.errors[type]) {
      const errors = this.state.errors
      errors[type] = undefined
      this.setState({errors: errors})
    }
  }

  authorizeMailApp () {
    const {mailAuthActions, user} = this.props
    mailAuthActions(_.snakeCase(this.state.mailAppData.type.replace(/Integration$/, '')), user.id)
  }

  render () {
    const {campaigns, integration, user} = this.props
    const {errors, selectedCampaign, mailAppData, visibleIntegrationFields} = this.state
    const oauthDataForSelectedIntegration = mailAppData.type
      ? user.oauth_providers[_.snakeCase(mailAppData.type.replace(/Integration$/, ''))] : undefined
    const authNeeded = _.includes(this.oauthServices, mailAppData.type) && !oauthDataForSelectedIntegration

    const integrationInputs = this.integrationFields.map((field_name) => {
      if (_.includes(visibleIntegrationFields, field_name)) {
        return <div className='col-sm-6' key={field_name}>
          <div className={`form-group ${errors[field_name] ? 'has-warning' : null}`}>
            <label className='control-label'>{
              _.capitalize(field_name.replace(/_/g, ' '))
            }</label>
            <input type='text' className='form-control'
              value={mailAppData[field_name]}
              onChange={this.handleChangeInput.bind(this, field_name)}
              onFocus={this.clearErrors.bind(this, field_name)} />
            <small className='help-block'>{errors[field_name]}</small>
          </div>
        </div>
      }
    })

    return (
      <div>
        <h2 className='title text-center'>{integration ? 'Update' : 'Connect'} Your Mail Application</h2>
        <p className='instructions text-center'>
          <a href='http://help.converthero.com/knowledge_base/categories/sending-leads-to-mail-platforms' target='_blank'>
            Click here for help finding your API key, list ID
          </a>
        </p>
        <div className='container-fluid mt-20 pt-15'>
          <div className='row'>
            <div className='col-sm-6'>
              <div className={`form-group ${errors['campaign'] ? 'has-warning' : null}`}>
                <label className='control-label'>Select Campaign</label>
                <Select
                  name='campaigns'
                  value={selectedCampaign}
                  options={campaigns || []}
                  valueKey='id'
                  labelKey='name'
                  clearable={false}
                  onChange={::this.handleChangeCampaign}
                  onFocus={this.clearErrors.bind(this, 'campaign')} />
                {errors && <small className='help-block'>{errors['campaign']}</small>}
              </div>
            </div>
            <div className='col-sm-6'>
              <div className='form-group'>
                <label className='control-label'>Select Service</label>
                <Select
                  name='services'
                  value={mailAppData.type}
                  options={mailServices}
                  clearable={false}
                  disabled={!!integration}
                  onChange={::this.handleChangeService}
                  onFocus={this.clearErrors.bind(this, 'type')} />
                {errors && <small className='help-block'>{errors['type']}</small>}
              </div>
            </div>

            {authNeeded && <div className='text-center'>
              <button className='btn btn-cta-primary' type='button' onClick={::this.authorizeMailApp}>
                Connect With Your Service Account
              </button>
            </div>}

            {!authNeeded && integrationInputs}
          </div>
        </div>
        <div className='text-right mt-20'>
          {integration ? <button type='button' className='btn bg-green btn-lg' onClick={::this.updateMailApp}>
            Update
          </button>
            : <button type='button' className='btn bg-green btn-lg' onClick={::this.connectMailApp}>
            Save
          </button>}
        </div>
      </div>
    )
  }
}
