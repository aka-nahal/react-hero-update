import { connect } from 'react-redux'
import { resetPassword, loadCurrentUser } from 'store/modules/auth'

import ChangePasswordPage from '../components/ChangePasswordPage'

const mapActionCreators = {
  resetPassword,
  loadCurrentUser
}

const mapStateToProps = (store) => ({
  user: store.auth.user,
  location: store.router.locationBeforeTransitions
})

export default connect(mapStateToProps, mapActionCreators)(ChangePasswordPage)
