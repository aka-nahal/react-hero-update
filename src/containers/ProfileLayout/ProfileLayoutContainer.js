import { connect } from 'react-redux'
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout'

const mapStateToProps = (store) => ({
  sidebar: store.sidebar
})

export default connect(mapStateToProps, null)(ProfileLayout)
