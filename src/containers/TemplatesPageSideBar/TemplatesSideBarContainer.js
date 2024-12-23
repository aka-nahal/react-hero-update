import { connect } from 'react-redux'
import { getTemplates } from 'store/modules/templates'
import TemplatesSideBar from 'components/TemplatesPage/TemplatesPageSideBar/TemplatesPageSideBar'

const mapActionCreators = {
  getTemplates
}

const mapStateToProps = (store) => ({
  location: store.router.locationBeforeTransitions
})

export default connect(mapStateToProps, mapActionCreators)(TemplatesSideBar)
