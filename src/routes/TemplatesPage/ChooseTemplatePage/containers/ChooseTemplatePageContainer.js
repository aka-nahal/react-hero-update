import ChooseTemplatePage from '../components/ChooseTemplatePage'
import { getTemplates } from 'store/modules/templates'
import { connect } from 'react-redux'

const mapStateToProps = (store) => ({
  location: store.router.locationBeforeTransitions,
  templates: store.templates
})

const mapActionCreators = {
  getTemplates
}

export default connect(mapStateToProps, mapActionCreators)(ChooseTemplatePage)
