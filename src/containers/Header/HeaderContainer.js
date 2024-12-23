import { connect } from 'react-redux'
import { logout } from 'store/modules/auth'
import Header from 'components/Header/Header'

const mapActionCreators = {
  logout
}

const mapStateToProps = (store) => ({
  user: store.auth.user
})

export default connect(mapStateToProps, mapActionCreators, null, { pure: false })(Header)
