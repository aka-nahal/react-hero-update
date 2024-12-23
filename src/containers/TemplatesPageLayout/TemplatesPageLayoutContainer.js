import { connect } from 'react-redux'
import TemplatesPageLayout from 'layouts/TemplatesPageLayout/TemplatesPageLayout'

const mapStateToProps = (store) => ({
  location: store.router.locationBeforeTransitions,
  sidebar: store.sidebar.templatesSidebar
})

export default connect(mapStateToProps)(TemplatesPageLayout)
