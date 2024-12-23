import { connect } from 'react-redux'
import { loadProfile, updateProfile } from '../modules/profile'
import { resetPassword, loadCurrentUser } from 'store/modules/auth'
import { reset } from 'redux-form'
import AccountSettings from '../components/AccountSettings'

const mapActionCreators = {
  loadProfile,
  updateProfile,
  resetPassword,
  reset,
  loadCurrentUser
}

const mapStateToProps = (store) => ({
  user: store.auth.user,
  profile: store.profile.data,
  loading: store.profile.loading
})

export default connect(mapStateToProps, mapActionCreators)(AccountSettings)
