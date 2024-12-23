import React from 'react'
import _ from 'lodash'
// components
import { Tabs, Tab, Collapse } from 'react-bootstrap'
import CampaignSettings from './TargetingPageParts/CampaignSettings'
import { toastr } from 'react-redux-toastr'
import { Link } from 'react-router'
// styles
import styles from './TargetingPage.scss'
import classNames from 'classnames/bind'
// constants
import { newTargetSet } from './Constants'
// utils
import handleResponseErrors from 'utils/handleResponseErrors'

const cx = classNames.bind(styles)

export default class TargetingPage extends React.Component {
  static propTypes = {
    getCampaign: React.PropTypes.func.isRequired,
    updateCampaign: React.PropTypes.func.isRequired,
    showModal: React.PropTypes.func.isRequired,
    routeParams: React.PropTypes.object.isRequired,
    user: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(...props)

    this.state = {
      toggled: {
        first: false,
        second: false,
        third: false,
        fourth: false,
        fifth: false
      },
      campaign: {},
      errors: {},
      activeTargetSet: 0
    }
  }

  componentDidMount () {
    const { getCampaign, routeParams } = this.props
    getCampaign(routeParams.campaign).then((response) => {
      this.createStatePopup(response)
    })
  }

  createStatePopup (response) {
    const { routeParams } = this.props
    const campaign = {}
    const popup = _.find(response.popups, {id: parseFloat(routeParams.popup)})
    campaign.popups_attributes = {}
    campaign.popups_attributes.id = popup.id
    campaign.popups_attributes.target_sets_attributes = popup.target_sets
    campaign.name = response.name
    campaign.domain = response.domain
    const target_sets = campaign.popups_attributes.target_sets_attributes

    _.map(target_sets, (item, index) => {
      if (item.user_conditions.on_page.pages.length === 0) {
        target_sets[index].user_conditions.on_page.pages.push('')
      }
      if (item.action_conditions.on_click.selectors.length === 0) {
        target_sets[index].action_conditions.on_click.selectors.push('')
      }
    })
    this.setState({campaign: campaign})
  }

  toggleAccordion (key) {
    const toggledPanels = this.state.toggled
    toggledPanels[key] = !toggledPanels[key]
    this.setState({toggled: toggledPanels})
  }

  changeCampaignData (type, e) {
    const campaign = this.state.campaign
    campaign[type] = e.target.value
    this.setState({campaign: campaign})
  }

  fixDomain () {
    const campaign = this.state.campaign
    if (campaign.domain) {
      campaign.domain = campaign.domain.replace(/^http(s)*:\/\//, '').replace(/^www\./, '').replace(/\/$/, '').toLowerCase()
      this.setState({campaign: campaign})
    }
  }

  fixPath (index, key) {
    const campaign = this.state.campaign
    const target_set = campaign.popups_attributes.target_sets_attributes[index]
    target_set.user_conditions.on_page.pages[key] = target_set.user_conditions.on_page.pages[key].replace(/(.+)\/$/, '$1')
    this.setState({campaign: campaign})
  }

  changeConditions (type, key, conditionType, id, e) {
    const campaign = this.state.campaign
    const target_sets = campaign.popups_attributes.target_sets_attributes[id]
    target_sets[conditionType][type][key] = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    this.setState({campaign: campaign})
  }

  addField (index, type, e) {
    e.preventDefault()
    const campaign = this.state.campaign
    const target_set = campaign.popups_attributes.target_sets_attributes[index]
    type === 'selector' ? target_set.action_conditions.on_click.selectors.push('')
      : target_set.user_conditions.on_page.pages.push('/')
    this.setState({campaign: campaign})
  }

  changeField (index, key, type, e) {
    const campaign = this.state.campaign
    const target_set = campaign.popups_attributes.target_sets_attributes[index]
    type === 'selector' ? target_set.action_conditions.on_click.selectors[key] = e.target.value
      : target_set.user_conditions.on_page.pages[key] = e.target.value
    this.setState({campaign: campaign})
  }

  saveTargetSets () {
    const { updateCampaign, routeParams } = this.props
    const data = this.state.campaign
    return updateCampaign(routeParams.campaign, data)
      .then((response) => {
        toastr.success('', 'Your campaign has been successfully updated')
        this.createStatePopup(response)
      })
      .catch((response) => {
        this.setState({errors: response.errors})
        handleResponseErrors(response, ['name', 'domain'])
      })
  }

  saveAndInstallTargetSets () {
    const { showModal, updateCampaign, routeParams, user } = this.props
    const { router } = this.context
    const data = this.state.campaign
    return updateCampaign(routeParams.campaign, data)
      .then((response) => {
        toastr.success('', 'Your campaign has been successfully updated')
        this.createStatePopup(response)
        if (user) {
          return router.push(`/campaigns/${response.id}/popups/${routeParams.popup}/installation`)
        }
        showModal('sign-up-modal', {campaign_id: routeParams.campaign, popup_id: routeParams.popup})
      })
      .catch((response) => {
        this.setState({errors: response.errors})
        handleResponseErrors(response, ['name', 'domain'])
      })
  }

  clearErrors (type) {
    if (this.state.errors[type]) {
      const errors = this.state.errors
      errors[type] = undefined
      this.setState({errors: errors})
    }
  }

  addTargetSet () {
    let campaign = this.state.campaign
    const target_sets = campaign.popups_attributes.target_sets_attributes
    target_sets.push(_.cloneDeep(newTargetSet))
    const activeTargetSet = target_sets.length - 1
    this.setState({campaign: campaign, activeTargetSet: activeTargetSet})
  }

  handleSelect (key) {
    if (key === 'add-target-set') {
      return this.addTargetSet()
    }
    this.setState({activeTargetSet: key})
  }

  removeTargetSet (index) {
    const { updateCampaign, routeParams } = this.props
    const campaign = this.state.campaign
    const target_sets = campaign.popups_attributes.target_sets_attributes
    if (target_sets.length === 1) return false
    if (target_sets[index].id) {
      const that = this
      target_sets[index]['_destroy'] = true
      return updateCampaign(routeParams.campaign, campaign)
        .then((response) => {
          that.createStatePopup(response)
          if (index === that.state.activeTargetSet || index === target_sets.length) {
            setTimeout(() => that.setState({activeTargetSet: index}))
          }
        })
        .catch((response) => {
          this.setState({errors: response.errors})
        })
    }

    target_sets.splice(index, 1)
    this.setState({campaign: campaign})
    if (index === this.state.activeTargetSet || index === target_sets.length) {
      return false
    }
    setTimeout(() => this.setState({activeTargetSet: index}))
  }

  showConnectAppsModal () {
    const { showModal, updateCampaign, routeParams, user } = this.props
    const data = this.state.campaign
    return updateCampaign(routeParams.campaign, data)
      .then((response) => {
        toastr.success('', 'Your campaign has been successfully updated')
        this.createStatePopup(response)
        if (user) {
          return showModal('connect-mail-apps', {campaign_id: routeParams.campaign})
        }
        showModal('sign-up-modal', {
          campaign_id: routeParams.campaign,
          popup_id: routeParams.popup,
          connect_mail_app: true
        })
      })
      .catch((response) => {
        this.setState({errors: response.errors})
        handleResponseErrors(response, ['name', 'domain'])
      })
  }

  static Switcher = (({item, changeConditions, type, elem, index, conditionType}) =>
    <div className='ios-switch switch-success'>
      <input type='checkbox' id={`switch-${type}-${index}`}
        onChange={changeConditions.bind(this, type, elem,
        conditionType, index)}
        checked={_.get(item, `${conditionType}.${type}.${elem}`) || false}
      />
      <label htmlFor={`switch-${type}-${index}`} className='switch-wrapper'>
        <div className='background-fill state-background'></div>
        <div className='background-fill on-background'></div>
        <div className='tumbler'></div>
      </label>
    </div>
  )

  static Panelheading = (({item, toggleAccordion, type, conditionType, title, index, toggled}) =>
    <div className='panel-heading cursor-pointer' onClick={toggleAccordion.bind(this, index)}>
      <h6 className='panel-title'>{title}</h6>
      <div className='heading-elements'>
        <span className={`label bg-${_.get(item,
        `${conditionType}.${type}.enabled`) ? 'success' : 'danger'} heading-text`}>
          {!_.get(item, `${conditionType}.${type}.enabled`) && 'in'}active
        </span>
        <span className={`heading-text fa fa-chevron-${toggled ? 'down' : 'up'}`} />
      </div>
    </div>
  )

  render () {
    const { routeParams } = this.props
    return (
      <div className='page-content'>
        <div className='content-wrapper'>
          <div className='page-header page-header-default'>
            <div className='page-header-content'>
              <div className='page-title text-center'>
                <h3>
                  Targeting
                </h3>
                <div className='header-buttons-wrapper'>
                  <Link to='/customize-template' query={{campaign: routeParams.campaign, popup: routeParams.popup}}
                    className='btn bg-green btn-xlg'>Back</Link>
                </div>
              </div>
            </div>
          </div>
          <div className='content'>
            <div className='row'>
              <div className='col-lg-12'>
                <CampaignSettings errors={this.state.errors} clearErrors={::this.clearErrors}
                  changeCampaignData={::this.changeCampaignData} campaign={this.state.campaign}
                  showConnectAppsModal={::this.showConnectAppsModal} fixDomain={::this.fixDomain} />
              </div>
              <div className={cx('col-lg-12', 'target-tab-wrapper')}>
                <Tabs activeKey={this.state.activeTargetSet} onSelect={::this.handleSelect} id='target-tabs'>
                  {this.state.campaign.popups_attributes &&
                  this.state.campaign.popups_attributes.target_sets_attributes.map((item, index) => {
                    return (
                      <Tab eventKey={index} title={<span>{`Target Set ${index + 1}`}
                        <i onClick={this.removeTargetSet.bind(this, index)} id='remove'
                          className='moon-cross3 remove' />
                      </span>} key={index}>
                        <div className={cx('main-tab-panel', 'panel panel-body')}>
                          <div className='container-fluid'>
                            <div className='row'>
                              <div className='col-sm-6'>
                                <div className='panel-flat'>
                                  <div className='panel-heading text-center'>
                                    When should the popup appear?
                                  </div>
                                  <div className='panel-body'>
                                    <div className='panel panel-default'>
                                      <TargetingPage.Panelheading item={item} toggleAccordion={::this.toggleAccordion}
                                        type='on_exit_intent' conditionType='action_conditions' title='On Exit Intent'
                                        index='first' toggled={this.state.toggled.first} />
                                      <Collapse in={this.state.toggled.first}>
                                        <div className='panel-body'>
                                          <div className='checkbox checkbox-right'>
                                            <label>
                                              Activate
                                            </label>
                                            <TargetingPage.Switcher item={item} type='on_exit_intent' elem='enabled'
                                              changeConditions={::this.changeConditions} index={index}
                                              conditionType='action_conditions' />
                                          </div>
                                          <br />
                                          <div className='instructions'>
                                            <p>
                                              NOTE: Exit Intent does not function on Mobile devices.
                                              <br />
                                              <span className='example'>
                                                To support both mobile and desktop, we recommend either including multiple
                                                popup triggers, or adding another target set.
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </Collapse>
                                    </div>
                                  </div>
                                  <div className='panel-body'>
                                    <div className='panel panel-default'>
                                      <TargetingPage.Panelheading item={item} toggleAccordion={::this.toggleAccordion}
                                        type='on_timeout' conditionType='action_conditions' index='second'
                                        title='After "x" second(s)' toggled={this.state.toggled.second} />
                                      <Collapse in={this.state.toggled.second}>
                                        <div className='panel-body'>
                                          <div className='checkbox checkbox-right'>
                                            <div className='form-group'>
                                              <label>
                                                Activate
                                              </label>
                                              <TargetingPage.Switcher item={item} type='on_timeout' elem='enabled'
                                                changeConditions={::this.changeConditions} index={index}
                                                conditionType='action_conditions' />
                                            </div>
                                            <div className='form-inline'>
                                              <div className='form-group'>
                                                <label>Popup will appear after</label>
                                                <input type='number'
                                                  className={cx('form-control', 'target-input-number',
                                                   'display-inline-block')}
                                                  value={_.get(item, 'action_conditions.on_timeout.timeout')}
                                                  onChange={this.changeConditions.bind(this, 'on_timeout', 'timeout',
                                                  'action_conditions', index)}
                                                />&nbsp;
                                                <label>sec</label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Collapse>
                                    </div>
                                  </div>
                                  <div className='panel-body'>
                                    <div className='panel panel-default'>
                                      <TargetingPage.Panelheading item={item} toggleAccordion={::this.toggleAccordion}
                                        type='on_scroll_down' conditionType='action_conditions' index='third'
                                        title='After scrolling down "x" percent' toggled={this.state.toggled.third} />
                                      <Collapse in={this.state.toggled.third}>
                                        <div className='panel-body'>
                                          <div className='checkbox checkbox-right'>
                                            <div className='form-group'>
                                              <label>
                                                Activate
                                              </label>
                                              <TargetingPage.Switcher item={item} type='on_scroll_down' elem='enabled'
                                                changeConditions={::this.changeConditions} index={index}
                                                conditionType='action_conditions' />
                                            </div>
                                            <div className='form-inline'>
                                              <div className='form-group'>
                                                <label>Popup will appear after scroll</label>
                                                <input type='number'
                                                  className={cx('form-control', 'target-input-number',
                                                   'display-inline-block')}
                                                  onChange={this.changeConditions.bind(this, 'on_scroll_down',
                                                  'scroll_size', 'action_conditions', index)}
                                                  value={_.get(item, 'action_conditions.on_scroll_down.scroll_size')}
                                                />&nbsp;
                                                <label htmlFor=''>%</label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Collapse>
                                    </div>
                                  </div>
                                  <div className='panel-body'>
                                    <div className='panel panel-default'>
                                      <TargetingPage.Panelheading item={item} toggleAccordion={::this.toggleAccordion}
                                        type='on_click' conditionType='action_conditions' index='fourth'
                                        title='On click' toggled={this.state.toggled.fourth} />
                                      <Collapse in={this.state.toggled.fourth}>
                                        <div className='panel-body'>
                                          <div className='checkbox checkbox-right'>
                                            <div className='form-group'>
                                              <label>
                                                Activate
                                              </label>
                                              <TargetingPage.Switcher item={item} type='on_click' elem='enabled'
                                                changeConditions={::this.changeConditions} index={index}
                                                conditionType='action_conditions' />
                                            </div>
                                            <div className='instructions'>
                                              <p>
                                                Enter CSS selector of the element that will trigger the popup.<br />
                                                <span className='example'>
                                                  <u>.btn</u> will trigger the popup on any element with the "btn" class
                                                </span>
                                                <br />
                                                <span className='example'>
                                                  <u>#headline</u> will trigger the popup on any element with the "headline" ID
                                                </span>
                                              </p>
                                            </div>
                                            {item.action_conditions &&
                                            item.action_conditions.on_click.selectors.map((value, key) => {
                                              return (
                                                <div className='form-group' key={key}>
                                                  <div className='form-inline'>
                                                    <label>CSS selector</label>
                                                    <input type='text' className='form-control display-inline-block'
                                                      onChange={this.changeField.bind(this, index, key, 'selector')}
                                                      value={value} style={{width: 'auto'}}
                                                    />
                                                    {item.action_conditions.on_click.selectors.length === (key + 1) &&
                                                      <button type='button' className={cx('btn border-teal text-teal',
                                                        'ml-20 btn-flat btn-icon btn-rounded', 'add-button')}
                                                        onClick={this.addField.bind(this, index, 'selector')}>
                                                        <i className='moon-plus3' />
                                                      </button>}
                                                  </div>
                                                </div>
                                              )
                                            })}
                                          </div>
                                        </div>
                                      </Collapse>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-sm-6'>
                                <div className='panel-flat'>
                                  <div className='panel-heading text-center'>
                                    Who should see the pop up? <span className='example'> (default: everyone)</span>
                                  </div>
                                  <div className='panel-body'>
                                    <div className='panel panel-default'>
                                      <TargetingPage.Panelheading item={item} toggleAccordion={::this.toggleAccordion}
                                        type='on_page' conditionType='user_conditions' index='fifth'
                                        title='Visitors who are browsing one of these pages'
                                        toggled={this.state.toggled.fifth} />
                                      <Collapse in={this.state.toggled.fifth}>
                                        <div className='panel-body'>
                                          <div className='checkbox checkbox-right'>
                                            <div className='form-group'>
                                              <label>
                                                Activate
                                              </label>
                                              <TargetingPage.Switcher item={item} type='on_page' elem='enabled'
                                                changeConditions={::this.changeConditions} index={index}
                                                conditionType='user_conditions' />
                                            </div>
                                          </div>
                                          <div className='instructions'>
                                            <p>
                                              Include only the PATH of the page (part of the URL after domain):
                                              <br />
                                              <span className='example'>
                                                To target <u>http://example.com/page/</u> you should enter <u>/page</u>
                                                &nbsp;(trailing slashes are ignored)
                                              </span>
                                            </p>
                                            <p>
                                              You could user wildcards to cover many pages with one rule:
                                            </p>
                                            <p>
                                              - an asterisk <b>(*)</b> will match 0 or more characters:
                                              <br />
                                              <span className='example'>
                                                <u>/products*</u> will match <u>/products</u>, <u>/products-catalog</u> and
                                                &nbsp;<u>/products/10/details</u>
                                              </span>
                                              <br />
                                              <span className='example'>
                                                <u>*checkout*</u> will match the word 'checkout' anywhere in the URL
                                              </span>
                                            </p>
                                            <p>
                                              - a question mark <b>(?)</b> will match exactly 1 character:
                                              <br />
                                              <span className='example'>
                                                <u>/products/??</u> will match <u>/products/10</u> and <u>/products/15</u>
                                              </span>
                                            </p>
                                          </div>
                                          <div className='form'>
                                            <label>Pages</label>
                                            {item.user_conditions &&
                                            item.user_conditions.on_page.pages.map((value, key) => {
                                              return (
                                                <div className='form-group' key={key}>
                                                  <div className='row'>
                                                    <div className='col-sm-10 col-xs-10'>
                                                      <input type='text' className='form-control'
                                                        onChange={this.changeField.bind(this, index, key, 'page')}
                                                        onBlur={this.fixPath.bind(this, index, key)}
                                                        value={value}
                                                      />
                                                    </div>
                                                    {item.user_conditions.on_page.pages.length === (key + 1) &&
                                                      <div className='col-sm-2 pt-5 col-xs-2'
                                                        style={{marginTop: '0px'}}>
                                                        <button type='button' className={cx('btn border-teal text-teal',
                                                         'btn-flat btn-icon btn-rounded', 'add-button')}
                                                          onClick={this.addField.bind(this, index, 'page')}>
                                                          <i className='moon-plus3' />
                                                        </button>
                                                      </div>
                                                    }
                                                  </div>
                                                </div>
                                              )
                                            })}
                                          </div>
                                        </div>
                                      </Collapse>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-sm-12 text-center mb-20 mt-10'>
                                <button className='btn bg-green btn-xlg' onClick={::this.saveTargetSets}>Save</button>
                                <button className='btn bg-green btn-xlg ml-20' onClick={::this.saveAndInstallTargetSets}>
                                  Save and install
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab>
                    )
                  })}
                  <Tab eventKey={'add-target-set'} title={<span><i className='moon-plus3' /> Add target set</span>} />
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
