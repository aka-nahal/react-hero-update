import InstallationPage from '../components/InstallationPage'
import { connect } from 'react-redux'

const mapStateToProps = (store) => ({
  location: store.router.locationBeforeTransitions,
  user: store.auth.user
})

export default connect(mapStateToProps, null)(InstallationPage)
