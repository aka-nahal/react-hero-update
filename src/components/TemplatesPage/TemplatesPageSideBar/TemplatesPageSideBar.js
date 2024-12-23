import React from 'react'
// components
import { NavItem, Nav, Tab } from 'react-bootstrap'

export default class TemplatesPageSideBar extends React.Component {
  static propTypes = {
    getTemplates: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  selectCategory (type, e) {
    e.preventDefault()
    const { getTemplates, location } = this.props
    const { router } = this.context
    const pathname = location.pathname
    const params = {category: type}

    getTemplates(params).then(() => {
      router.push({
        pathname,
        query: type !== '' ? {'category': type} : {}
      })
    })
  }

  render () {
    return (
      <div className='sidebar sidebar-main text-left choose-template-sidebar'>
        <div className='sidebar-content'>
          <div className='sidebar-category sidebar-category-visible'>
            <div className='category-content no-padding'>
              <Tab.Container defaultActiveKey={1} id='left-tabs-example'>
                <Nav className='navigation navigation-main navigation-accordion'>
                  <li className='navigation-header'>
                    <span>
                      Categories
                    </span>
                  </li>
                  <NavItem eventKey={1} onClick={this.selectCategory.bind(this, '')}>
                    <span> See All Templates</span>
                  </NavItem>
                  <NavItem eventKey={2} onClick={this.selectCategory.bind(this, 'email_collect')}>
                    <span> Email Collect LightBox</span>
                  </NavItem>
                  <NavItem eventKey={3} onClick={this.selectCategory.bind(this, 'full_screen')}>
                    <span> Full Screen</span>
                  </NavItem>
                  <NavItem eventKey={4} onClick={this.selectCategory.bind(this, 'social_media')}>
                    <span> Social Media</span>
                  </NavItem>
                  <NavItem eventKey={5} onClick={this.selectCategory.bind(this, 'two_step')}>
                    <span> Two Step</span>
                  </NavItem>
                  <NavItem eventKey={6} onClick={this.selectCategory.bind(this, 'e_commerce')}>
                    <span> eCommerce</span>
                  </NavItem>
                </Nav>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
