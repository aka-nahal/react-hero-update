import { connect } from 'react-redux'
import { showModal, hideModal } from 'store/modules/modals'

import Modal from 'components/Modal/Modal'

const mapActionCreators = {
  showModal, hideModal
}

const mapStateToProps = (store) => ({
  modals: store.modals
})

export default connect(mapStateToProps, mapActionCreators)(Modal)
