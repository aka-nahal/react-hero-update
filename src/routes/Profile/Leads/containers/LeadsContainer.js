import { connect } from 'react-redux'
import Leads from '../components/Leads'
import { getLeads } from 'store/modules/leads'
import { getCampaigns } from 'store/modules/campaigns'
import { showModal } from 'store/modules/modals'

const mapStateToProps = (store) => ({
  location: store.router.locationBeforeTransitions,
  leads: store.leads.resources,
  leadsLoading: store.leads.resources.loading,
  leadsTotalCount: store.leads.resources.total,
  campaigns: store.campaigns.resources.data
})

const mapActionCreators = {
  getLeads,
  getCampaigns,
  showModal
}

export default connect(mapStateToProps, mapActionCreators)(Leads)
