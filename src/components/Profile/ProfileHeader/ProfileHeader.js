import React from 'react'
// components
import { IndexLink } from 'react-router'
import { toastr } from 'react-redux-toastr'
import { LinkContainer } from 'react-router-bootstrap'
import { NavItem, NavDropdown, MenuItem, Navbar, Nav } from 'react-bootstrap'
// styles
import styles from './ProfileHeader.scss'
// images
import logo from 'static/branding/logo.png'

export default class ProfileHeader extends React.Component {
  static propTypes = {
    logout: React.PropTypes.func.isRequired,
    toggleSidebar: React.PropTypes.func.isRequired,
    toggleSidebarMobile: React.PropTypes.func.isRequired,
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

  toggleSidebar (type) {
    const { toggleSidebar, toggleSidebarMobile } = this.props
    type === 'mobile' ? toggleSidebarMobile() : toggleSidebar()
  }

  render () {
    const { user } = this.props
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
    return (
      <header className={styles['profile-header']}>
        <Navbar inverse fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to='/' className='navbar-brand'><img src={logo} alt='' className='logo-img' /></IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
            <button className='navbar-toggle collapsed' onClick={this.toggleSidebar.bind(this, 'mobile')}
              style={{paddingTop: '5px'}}>
              <i className='moon-tree5' />
            </button>
          </Navbar.Header>
          <Nav pullLeft>
            <NavItem eventKey={1} onClick={::this.toggleSidebar} href='#'>
              <i className='fa fa-align-justify' />
            </NavItem>
          </Nav>
          <Navbar.Collapse>
            <Nav pullRight>
              {user && userDropdown}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}
