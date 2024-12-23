import React from 'react'
// components
import { IndexLink } from 'react-router'
import { toastr } from 'react-redux-toastr'
import { LinkContainer } from 'react-router-bootstrap'
import { NavItem, NavDropdown, MenuItem, Navbar, Nav } from 'react-bootstrap'
// styles
import styles from './Header'
// images
import logo from 'static/branding/logo.png'

export default class Header extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    logout: React.PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor (props) {
    super(props)

    this.state = { scroll: false }
    this.handleSwitchHeader = this.handleSwitchHeader.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleSwitchHeader)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleSwitchHeader)
  }

  handleSwitchHeader () {
    const scrolled = window.scrollY > 50
    this.setState({scroll: scrolled})
  }

  logout = () => {
    this.props.logout()
    this.context.router.push('/')
    toastr.success('', 'You successfully logged out!')
  }

  render () {
    const { user } = this.props
    const userDropdown = (user &&
      <NavDropdown id='nav-dropdown' title={user.first_name || user.full_name} className={styles.userDropdown}>
        <LinkContainer to='home'>
          <MenuItem>Dashboard</MenuItem>
        </LinkContainer>
        <LinkContainer to='billing'>
          <MenuItem>Billing / Subscriptions</MenuItem>
        </LinkContainer>
        <LinkContainer to='account-settings'>
          <MenuItem>Account Settings</MenuItem>
        </LinkContainer>
        <MenuItem onClick={this.logout}>Logout</MenuItem>
      </NavDropdown>
    )
    return (
      <header className={`header main-header ${this.state.scroll && 'scrolled'}`}>
        <Navbar>
          <h1 className='logo'>
            <IndexLink to='/' className='navbar-brand'><img src={logo} alt='' className='logo-img' /></IndexLink>
          </h1>
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to='features'>
                <NavItem>Features</NavItem>
              </LinkContainer>
              <LinkContainer to='pricing'>
                <NavItem>Pricing</NavItem>
              </LinkContainer>
              {!user ? <LinkContainer to='login'><NavItem>Sign in</NavItem></LinkContainer>
                : userDropdown}
              {!user && <NavItem className='sign-up-link'>
                <LinkContainer to='choose-template'>
                  <button className='btn btn-cta btn-cta-secondary'>Try It Free</button>
                </LinkContainer>
              </NavItem>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}
