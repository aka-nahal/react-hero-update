import React from 'react'
// components
import Footer from 'components/Footer/Footer'
// styles
import 'styles/theme/base.less'
import 'font-awesome/scss/font-awesome.scss'

export const InnerLayout = ({ children }) => (
  <div>
    {children}
    <Footer />
  </div>
)

InnerLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default InnerLayout
