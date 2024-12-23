import { connect } from 'react-redux'
import { signUp, oAuthActions } from 'store/modules/auth'
import SignUpPage from '../components/SignUpPage'

const mapActionCreators = {
  signUp,
  oAuthActions
}

const mapStateToProps = (store) => ({
  user: store.auth.user
})

export default connect(mapStateToProps, mapActionCreators)(SignUpPage)
