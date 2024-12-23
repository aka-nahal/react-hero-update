import CustomPlan from '../components/CustomPlan'
import { getCampaigns } from 'store/modules/campaigns'
import { loadCurrentUser } from 'store/modules/auth'
import { connect } from 'react-redux'

const mapStateToProps = (store) => ({
  user: store.auth.user,
  location: store.router.locationBeforeTransitions
})

const mapActionCreators = {
  getCampaigns,
  loadCurrentUser
}

export default connect(mapStateToProps, mapActionCreators)(CustomPlan)
