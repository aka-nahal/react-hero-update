import ModalLogin from '../components/TargetingPageParts/ModalLogin'
import { login, oAuthActions } from 'store/modules/auth'
import { hideModal, showModal } from 'store/modules/modals'
import { connect } from 'react-redux'

const mapActionCreators = {
  login,
  oAuthActions,
  hideModal,
  showModal
}

const mapStateToProps = (store) => ({
  modalData: store.modals.data
})

export default connect(mapStateToProps, mapActionCreators)(ModalLogin)
