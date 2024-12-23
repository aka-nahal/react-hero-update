import { connect } from 'react-redux'
import { recoveryPassword } from 'store/modules/auth'
import RecoveryPassword from '../components/RecoveryPassword'

const mapActionCreators = {
  recoveryPassword
}

export default connect(null, mapActionCreators)(RecoveryPassword)
