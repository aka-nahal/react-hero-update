import React from 'react'
// components
import Header from 'containers/Header/HeaderContainer'
import ScrollTopButton from 'components/ScrollTopButton/ScrollTopButton'
import Footer from 'components/Footer/Footer'
// styles
import 'styles/theme/base.less'
import 'font-awesome/scss/font-awesome.scss'

export const MainLayout = ({ children }) => (
  <div>
    <Header />
    <div>
      <div>
        {children}
      </div>
      <ScrollTopButton />
    </div>
    <Footer />
  </div>
)

MainLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default MainLayout
