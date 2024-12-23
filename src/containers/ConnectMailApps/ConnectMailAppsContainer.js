import { connect } from 'react-redux'
import _ from 'lodash'
import { hideModal } from 'store/modules/modals'
import { getCampaigns, getCampaign } from 'store/modules/campaigns'
import { saveIntegration } from 'store/modules/integrations'
import ConnectMailApps from 'components/Profile/ConnectMailApps/ConnectMailApps'
import { mailAuthActions } from 'store/modules/auth'

const mapActionCreators = {
  hideModal,
  getCampaigns,
  getCampaign,
  saveIntegration,
  mailAuthActions
}

const mapStateToProps = (store) => ({
  campaign_id: _.get(store, 'modals.data.campaign_id'),
  integration: _.get(store, 'modals.data.integration'),
  updateIntegration: _.get(store, 'modals.data.updateIntegration'),
  campaigns: store.campaigns.resources.data,
  campaign: store.campaigns.resource.data,
  user: store.auth.user
})

export default connect(mapStateToProps, mapActionCreators)(ConnectMailApps)
