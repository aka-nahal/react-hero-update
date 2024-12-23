import React from 'react'
// components
import { IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { NavItem, Navbar, Nav, MenuItem, NavDropdown } from 'react-bootstrap'
import { toastr } from 'react-redux-toastr'
// styles
import styles from '../TemplatesPage.scss'
import classNames from 'classnames/bind'
// images
import logo from 'static/branding/logo.png'

const cx = classNames.bind(styles)

export default class TemplatesPageHeader extends React.Component {
  static propTypes = {
    toggleTemplatesSidebar: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired,
    params: React.PropTypes.object,
    user: React.PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  logout = () => {
    this.props.logout()
    this.context.router.push('/')
    toastr.success('', 'You successfully logged out!')
  }

  toggleSidebar () {
    const { toggleTemplatesSidebar } = this.props
    toggleTemplatesSidebar()
  }

  render () {
    const { params, location, user } = this.props
    const userDropdown = (user &&
      <NavDropdown id='nav-dropdown' title={user.first_name || user.full_name} className={styles.userDropdown}>
        <LinkContainer to='home'>
          <MenuItem>
            <i className='fa fa-home' />
            Home
          </MenuItem>
        </LinkContainer>
        <LinkContainer to='account-settings'>
          <MenuItem>
            <i className='fa fa-cog' />
            Account Settings
          </MenuItem>
        </LinkContainer>
        <MenuItem className='divider' />
        <MenuItem onClick={this.logout}>
          <i className='fa fa-power-off' />
          Logout
        </MenuItem>
      </NavDropdown>
    )
    const defaultLink = `/campaigns/${params.campaign}/popups/${params.popup}`
    return (
      <header className={styles['templates-page-navbar']}>
        <Navbar inverse fluid>
          <Navbar.Header className='templates-nav-brand'>
            <Navbar.Brand>
              <IndexLink to='/' className='navbar-brand'>
                <img src={logo} alt='' className='logo-img img-responsive' />
              </IndexLink>
            </Navbar.Brand>
            <Nav pullRight className='templates-nav-dropdown dropdown-left'>
              {user && userDropdown}
            </Nav>
            <Navbar.Toggle />
            <button className='navbar-toggle collapsed sidebar-toogle-button' onClick={::this.toggleSidebar} style={{paddingTop: '5px'}}>
              <i className='moon-tree5' />
            </button>
          </Navbar.Header>
          <Navbar.Collapse className='templates-nav-collapse collapse'>
            <Nav className='templates-nav'>
              <LinkContainer to='/choose-template' disabled>
                <NavItem eventKey={1}>
                  1. Choose Your Template
                </NavItem>
              </LinkContainer>
              <LinkContainer to='/customize-template' query={{campaign: params.campaign, popup: params.popup}}
                disabled={location.pathname !== `${defaultLink}/target_sets`}
                className={cx({'enabled': location.pathname === `${defaultLink}/target_sets`})}>
                <NavItem eventKey={2}>
                  2. Customize Your Template
                </NavItem>
              </LinkContainer>
              <LinkContainer to={`${defaultLink}/target_sets`}
                disabled={location.pathname !== `${defaultLink}/installation`}
                className={cx({'enabled': location.pathname === `${defaultLink}/installation`})}>
                <NavItem eventKey={3}>
                  3. Choose Targeting
                </NavItem>
              </LinkContainer>
              <LinkContainer to={`${defaultLink}/installation`} disabled>
                <NavItem eventKey={4}>
                  4. Installation
                </NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
          <Nav pullRight className='templates-nav-dropdown dropdown-right'>
            {user && userDropdown}
          </Nav>
        </Navbar>
      </header>
    )
  }
}
