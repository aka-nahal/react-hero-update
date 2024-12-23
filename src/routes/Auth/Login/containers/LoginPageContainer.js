import { connect } from 'react-redux'
import { login, logout, oAuthActions } from 'store/modules/auth'
import LoginPage from '../components/LoginPage'

const mapActionCreators = {
  login,
  logout,
  oAuthActions
}

const mapStateToProps = (store) => ({
  user: store.auth.user
})

export default connect(mapStateToProps, mapActionCreators)(LoginPage)
