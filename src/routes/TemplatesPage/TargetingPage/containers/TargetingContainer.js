import TargetingPage from '../components/TargetingPage'
import { getCampaign, updateCampaign } from 'store/modules/campaigns'
import { showModal } from 'store/modules/modals'
import { connect } from 'react-redux'

const mapActionCreators = {
  getCampaign,
  updateCampaign,
  showModal
}

const mapStateToProps = (store) => ({
  campaigns: store.campaigns,
  location: store.router.locationBeforeTransitions,
  user: store.auth.user
})

export default connect(mapStateToProps, mapActionCreators)(TargetingPage)
