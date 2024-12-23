import React from 'react'
// components
import { NavItem, Nav, Tab } from 'react-bootstrap'
// styles
import styles from '../CustomizeTemplate.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default class LeftSidebar extends React.Component {
  static propTypes = {
    template: React.PropTypes.object.isRequired,
    changePage: React.PropTypes.func.isRequired,
    toggleMainBar: React.PropTypes.func.isRequired,
    toggleOtherSettingsBar: React.PropTypes.func.isRequired,
    mainBarOpen: React.PropTypes.bool.isRequired,
    otherSettingsOpen: React.PropTypes.bool.isRequired
  }

  render () {
    const { template, changePage, toggleMainBar, toggleOtherSettingsBar, mainBarOpen, otherSettingsOpen } = this.props
    return (
      <div className={cx('sidebar sidebar-main text-left', 'left-sidebar')}>
        <div className='sidebar-content'>
          <div className='sidebar-category sidebar-category-visible'>
            <div className='category-content no-padding'>
              <Nav bsStyle='pills' stacked className={cx('navigation navigation-main', 'left-sidebar-navigation')}>
                <li className={cx('navigation-header', 'navigation-pages')}>
                  <span>Settings</span>
                </li>
                <NavItem className='text-center' active={mainBarOpen} onClick={toggleMainBar}>
                  <span className='fa fa-desktop' />
                  <div>Display</div>
                </NavItem>
                <NavItem className='text-center' active={otherSettingsOpen} onClick={toggleOtherSettingsBar}>
                  <span className='fa fa-gears' />
                  <div>Other</div>
                </NavItem>
              </Nav>
              <Tab.Container defaultActiveKey={0} id='left-tabs-pages'>
                <Nav bsStyle='pills' stacked className={cx('navigation navigation-main', 'left-sidebar-navigation')}>
                  <li className={cx('navigation-header', 'navigation-pages')}>
                    <span>Pages</span>
                  </li>
                  {template.default_data && template.default_data.map((item, index) => {
                    return (
                      <NavItem bsStyle='pills' eventKey={index} key={index} onClick={changePage.bind(this, index)}
                        className='text-center'>
                        <span className='fa fa-file-text-o' />
                        <div>Page {index + 1}</div>
                      </NavItem>
                    )
                  })}
                </Nav>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
