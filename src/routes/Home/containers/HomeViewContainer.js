import { connect } from 'react-redux'
import { showModal } from 'store/modules/modals'

import HomeView from '../components/HomeView'

const mapActionCreators = {
  showModal
}

export default connect(null, mapActionCreators)(HomeView)
