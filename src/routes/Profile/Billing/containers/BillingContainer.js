import Billing from '../components/Billing'
import { getCampaigns } from 'store/modules/campaigns'
import { loadCurrentUser } from 'store/modules/auth'
import { connect } from 'react-redux'

const mapStateToProps = (store) => ({
  user: store.auth.user
})

const mapActionCreators = {
  getCampaigns,
  loadCurrentUser
}

export default connect(mapStateToProps, mapActionCreators)(Billing)
