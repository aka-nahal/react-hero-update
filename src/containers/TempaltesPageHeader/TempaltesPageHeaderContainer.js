import { connect } from 'react-redux'
import TemplatesHeader from 'components/TemplatesPage/TemplatesPageHeader/TemplatesPageHeader'
import { toggleTemplatesSidebar } from 'store/modules/sidebar'
import { logout } from 'store/modules/auth'

const mapActionCreators = {
  toggleTemplatesSidebar,
  logout
}

const mapStateToProps = (store) => ({
  location: store.router.locationBeforeTransitions,
  user: store.auth.user
})

export default connect(mapStateToProps, mapActionCreators, null, { pure: false })(TemplatesHeader)
