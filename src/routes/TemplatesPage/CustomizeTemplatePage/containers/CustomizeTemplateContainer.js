import { connect } from 'react-redux'
import CustomizeTemplatePage from '../components/CustomizeTemplatePage'
import { getTemplate, getTemplates } from 'store/modules/templates'
import { createPopup, uploadPopupImage, getPopup, updatePopup } from 'store/modules/popups'

const mapActionCreators = {
  getTemplate,
  createPopup,
  uploadPopupImage,
  getTemplates,
  getPopup,
  updatePopup
}

const mapStateToProps = (store) => ({
  templates: store.templates,
  location: store.router.locationBeforeTransitions
})

export default connect(mapStateToProps, mapActionCreators)(CustomizeTemplatePage)
