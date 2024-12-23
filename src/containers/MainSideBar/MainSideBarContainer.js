import { connect } from 'react-redux'
import MainSideBar from 'components/Profile/MainSideBar/MainSideBar'

const mapStateToProps = (store) => ({
  user: store.auth.user
})

export default connect(mapStateToProps, null, null, { pure: false })(MainSideBar)
