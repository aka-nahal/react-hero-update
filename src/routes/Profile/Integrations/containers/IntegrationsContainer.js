import { connect } from 'react-redux'
import { showModal } from 'store/modules/modals'
import { getCampaigns } from 'store/modules/campaigns'
import { getIntegrations, removeIntegration, updateIntegration } from 'store/modules/integrations'
import Integrations from '../components/Integrations'

const mapActionCreators = {
  showModal,
  getCampaigns,
  getIntegrations,
  removeIntegration,
  updateIntegration
}

const mapStateToProps = (store) => ({
  campaigns: store.campaigns.resources.data,
  campaign: store.campaigns.resource.data,
  integrations: store.integrations.resources,
  location: store.router.locationBeforeTransitions
})

export default connect(mapStateToProps, mapActionCreators)(Integrations)
