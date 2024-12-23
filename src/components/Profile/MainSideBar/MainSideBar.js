import React from 'react'
// components
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router'
import { NavItem, Nav, Collapse } from 'react-bootstrap'
import classNames from 'classnames'

export default class MainSideBar extends React.Component {
  static propTypes = {
    user: React.PropTypes.object
  };

  constructor (props) {
    super(...props)

    this.state = {
      campaignsOpen: false
    }
  }

  toggleCampaigns (e) {
    e.preventDefault()
    this.setState({campaignsOpen: !this.state.campaignsOpen})
  }

  closeCampaigns () {
    this.setState({campaignsOpen: false})
  }

  render () {
    const { user } = this.props
    return (
      <div className='sidebar sidebar-main text-left'>
        <div className='sidebar-content'>
          <div className='sidebar-user'>
            <div className='category-content'>
              <div className='media'>
                <div className='media-body'>
                  <span className='media-heading text-semibold'>
                    Welcome, {user.full_name}
                  </span>
                  {user.phone && <div className='text-size-mini text-muted'>
                    <i className='fa fa-phone text-size-small' />&nbsp;
                    {user.phone}
                  </div>}
                </div>
              </div>
            </div>
          </div>

          <div className='sidebar-category sidebar-category-visible'>
            <div className='category-content no-padding'>
              <Nav className='navigation navigation-main navigation-accordion'>
                <LinkContainer to='/home' active={this.state.campaignsOpen ? false : undefined}
                  onClick={::this.closeCampaigns}>
                  <NavItem eventKey={1}>
                    <i className='fa fa-home' />
                    <span> Home</span>
                  </NavItem>
                </LinkContainer>
                <li className={classNames({'active': this.state.campaignsOpen})} onClick={::this.toggleCampaigns}>
                  <a href='#' className='has-ul'>
                    <i className='fa fa-dashboard' />
                    <span>Campaigns</span>
                  </a>
                  <Collapse in={this.state.campaignsOpen}>
                    <ul>
                      <li>
                        <Link to='/home'>View Campaigns</Link>
                      </li>
                      <li>
                        <Link to='/choose-template'>+ Add new campaign</Link>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                <LinkContainer to='/leads' active={this.state.campaignsOpen ? false : undefined}
                  onClick={::this.closeCampaigns}>
                  <NavItem eventKey={3}>
                    <i className='fa fa-crosshairs' />
                    <span> Leads</span>
                  </NavItem>
                </LinkContainer>
                <LinkContainer to='/email-integrations' active={this.state.campaignsOpen ? false : undefined}
                  onClick={::this.closeCampaigns}>
                  <NavItem eventKey={4}>
                    <i className='fa fa-envelope' />
                    <span> Integrations</span>
                  </NavItem>
                </LinkContainer>
                <LinkContainer to='/billing' active={this.state.campaignsOpen ? false : undefined}
                  onClick={::this.closeCampaigns}>
                  <NavItem eventKey={5}>
                    <i className='fa fa-money' />
                    <span> Billing / Subscription</span>
                  </NavItem>
                </LinkContainer>
                <LinkContainer to='/account-settings' active={this.state.campaignsOpen ? false : undefined}
                  onClick={::this.closeCampaigns}>
                  <NavItem eventKey={6}>
                    <i className='fa fa-gears' />
                    <span> Account Settings</span>
                  </NavItem>
                </LinkContainer>
              </Nav>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
