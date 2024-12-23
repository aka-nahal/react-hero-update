import { connect } from 'react-redux'
import ProfileHeader from 'components/Profile/ProfileHeader/ProfileHeader'
import { logout } from 'store/modules/auth'
import { toggleSidebar, toggleSidebarMobile } from 'store/modules/sidebar'

const mapActionCreators = {
  logout,
  toggleSidebar,
  toggleSidebarMobile
}

const mapStateToProps = (store) => ({
  user: store.auth.user,
  location: store.router.locationBeforeTransitions
})

export default connect(mapStateToProps, mapActionCreators)(ProfileHeader)
