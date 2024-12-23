import React from 'react'
// components
import { Link } from 'react-router'
import { Line } from 'react-chartjs'
import DatePicker from 'react-datepicker'
import CampaignsTable from './CampaignsTable'
import { toastr } from 'react-redux-toastr'
// utils
import _ from 'lodash'
import moment from 'moment'
import handleResponseErrors from 'utils/handleResponseErrors'
import { chartData, chartOption } from 'store/helpers/ChartOptions'
// styles
import styles from './Home.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default class Home extends React.Component {
  static propTypes = {
    campaigns: React.PropTypes.array.isRequired,
    getCampaigns: React.PropTypes.func.isRequired,
    updateCampaign: React.PropTypes.func.isRequired,
    removeCampaign: React.PropTypes.func.isRequired,
    getChartStats: React.PropTypes.func.isRequired,
    getSummaryStats: React.PropTypes.func.isRequired,
    summaryStats: React.PropTypes.object.isRequired,
    chartStats: React.PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(...props)

    this.state = {
      visibleInput: '',
      sortType: '',
      chartData: {},
      startDate: moment().subtract(1, 'month'),
      endDate: moment(),
      campaignsNames: []
    }
  }

  componentDidMount () {
    const { getCampaigns, getSummaryStats } = this.props
    getCampaigns().then((campaigns) => {
      const campaignsNames = []
      _.each(campaigns, (item) => {
        campaignsNames.push(item.name || '')
      })
      this.setState({campaignsNames: campaignsNames})
    })
    this.fetchChartStats()
    getSummaryStats()
  }

  fetchChartStats () {
    const { getChartStats } = this.props
    const timezoneOffset = new Date().getTimezoneOffset()
    const startDate = this.state.startDate.format('YYYY-MM-DD')
    const endDate = this.state.endDate.format('YYYY-MM-DD')
    const params = {start_period: startDate, end_period: endDate, time_offset: timezoneOffset}
    getChartStats(params).then((stats) => {
      const dataForChart = chartData(stats.impressions, stats.conversions)
      this.setState({chartData: dataForChart})
    })
  }

  changeCampaignName (index, e) {
    if (e === 'blur') {
      const { campaigns, updateCampaign } = this.props
      const campaign = campaigns[index]
      campaign.name = this.state.campaignsNames[index]
      updateCampaign(campaign.id, campaign)
        .then(() => toastr.success('', 'Your campaign name has been successfully updated'))
        .catch((error) => handleResponseErrors(error, ['name', 'domain']))
      return this.setState({visibleInput: ''})
    }
    const campaignsNames = this.state.campaignsNames
    campaignsNames[index] = e.target.value
    this.setState({campaignsNames: campaignsNames})
  }

  sortByDomain (type) {
    const { getCampaigns } = this.props
    const params = `domain ${type}`
    getCampaigns(params).then((campaigns) => {
      const campaignsNames = []
      _.each(campaigns, (item) => {
        campaignsNames.push(item.name || '')
      })
      this.setState({campaignsNames: campaignsNames, sortType: type})
    })
  }

  removeCampaign (item) {
    const { removeCampaign, getSummaryStats } = this.props
    const toastrConfirmOptions = {
      onOk: () => removeCampaign(item.id).then(() => {
        toastr.success('', 'Your campaign was successfully deleted')
        getSummaryStats()
        this.fetchChartStats()
      })
    }
    toastr.confirm('Are you sure?', toastrConfirmOptions)
  }

  handleChangeDate (type, time) {
    const { getChartStats } = this.props
    const date = time.format('YYYY-MM-DD')
    const timezoneOffset = new Date(time).getTimezoneOffset()
    const startDate = type === 'startDate' ? date : this.state.startDate.format('YYYY-MM-DD')
    const endDate = type === 'endDate' ? date : this.state.endDate.format('YYYY-MM-DD')
    const params = {start_period: startDate, end_period: endDate, time_offset: timezoneOffset}
    getChartStats(params).then((stats) => {
      const dataForChart = chartData(stats.impressions, stats.conversions)
      this.setState({chartData: dataForChart})
    })
    this.setState({[type]: time})
  }

  updateStatus (campaign) {
    const { updateCampaign } = this.props
    campaign.status = campaign.status === 'active' ? 'paused' : 'active'
    updateCampaign(campaign.id, campaign)
  }

  lessThanEndDate (date) {
    return date < this.state.endDate
  }

  greaterThanStartDate (date) {
    return date > this.state.startDate
  }

  static HeaderStats = (({summaryStats}) =>
    <div className='row'>
      <div className='col-sm-8'>
        <div className='row chart-wrapper'>
          <div className='col-sm-3'>
            <h2>All Time</h2>
          </div>
          <div className='col-sm-3'>
            <span>Impressions</span>
            <br />
            <h2>{summaryStats.impressions}</h2>
          </div>
          <div className='col-sm-3'>
            <span>Conversions</span>
            <br />
            <h2>{summaryStats.conversions}</h2>
          </div>
          <div className='col-sm-3'>
            <span>CVR</span>
            <br />
            <h2>{summaryStats.cvr ? Math.floor(summaryStats.cvr) : 0}%</h2>
          </div>
        </div>
      </div>
      <div className='col-sm-4 text-center'>
        <Link to='/installation' className='btn bg-green btn-xlg mt-15 mr-10'>Installation</Link>
        <Link to='/choose-template' className='btn bg-green btn-xlg mt-15'>New Campaign</Link>
      </div>
    </div>
  )

  render () {
    const { campaigns, summaryStats, chartStats } = this.props
    return (
      <div className={cx('dashboard-content', 'content-wrapper')}>
        <div className='page-header page-header-default'>
          <div className='page-header-content'>
            <div className='page-title text-left'>
              <h4>
                <i className='fa fa-arrow-circle-o-left position-left' />
                Home
              </h4>
            </div>
          </div>
        </div>
        <div className='content'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='panel panel-flat'>
                <div className='panel-body'>
                  <div className='container-fluid'>
                    <Home.HeaderStats summaryStats={summaryStats} />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-12'>
              <div className='panel panel-flat'>
                <div className='panel-heading'>
                  <div className='container-fluid'>
                    <div className='row'>
                      <h4 className='pull-left'>Overall Stats</h4>
                      <div className='pull-right'>
                        <div className='date-period'>
                          <DatePicker
                            selected={this.state.startDate}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            filterDate={::this.lessThanEndDate}
                            className='form-control'
                            onChange={this.handleChangeDate.bind(this, 'startDate')} />
                          <span className='dash'>—</span>
                          <DatePicker
                            selected={this.state.endDate}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            filterDate={::this.greaterThanStartDate}
                            className='form-control'
                            onChange={this.handleChangeDate.bind(this, 'endDate')} />
                          <i className='fa fa-calendar' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='panel-body'>
                  <div className='container-fluid'>
                    <div className='row'>
                      <div className='col-sm-8' id='chart'>
                        {!_.isEmpty(this.state.chartData) && <Line data={this.state.chartData} options={chartOption}
                          width={`${document.getElementById('chart').offsetWidth - 40}px`} height='350px' redraw />}
                      </div>
                      <div className='col-sm-4'>
                        <div className='panel panel-flat mt-10'>
                          <div className='panel-body'>
                            {chartStats.total && <div className='stats-wrapper'>
                              <div>Impressions: {chartStats.total.impressions}</div>
                              <div>Conversions: {chartStats.total.conversions}</div>
                              <div>
                                CVR: {(chartStats.total ? Math.floor(chartStats.total.cvr) : 0)}%
                              </div>
                            </div>}
                            <div className={cx('legends-wrapper')}>
                              <ul>
                                <li>
                                  <span /> Impressions
                                </li>
                                <li>
                                  <span /> Conversions
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-12'>
              <div className='panel panel-flat'>
                <div className='panel-heading'>
                  <h4>Campaigns</h4>
                </div>
                <div className='panel-body'>
                  {campaigns.length > 0 &&
                    <div className='table-responsive'>
                      <CampaignsTable campaigns={campaigns} sortByDomain={::this.sortByDomain}
                        sortType={this.state.sortType} campaignsNames={this.state.campaignsNames}
                        visibleInput={this.state.visibleInput} changeCampaignName={::this.changeCampaignName}
                        removeCampaign={::this.removeCampaign} updateStatus={::this.updateStatus}
                        changeVisible={(index) => this.setState({visibleInput: index})} />
                    </div>}
                  {campaigns.length === 0 && <div className='no-items-placeholder'>
                    <h4>
                      You don't have any campaigns set up. <Link to='/choose-template'>Click Here To Get Started</Link>
                    </h4>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
