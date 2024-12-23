import ModalSignUp from '../components/TargetingPageParts/ModalSignUp'
import { signUp, oAuthActions } from 'store/modules/auth'
import { hideModal, showModal } from 'store/modules/modals'
import { connect } from 'react-redux'

const mapActionCreators = {
  signUp,
  oAuthActions,
  hideModal,
  showModal
}

const mapStateToProps = (store) => ({
  modalData: store.modals.data
})

export default connect(mapStateToProps, mapActionCreators)(ModalSignUp)
