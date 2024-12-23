import React from 'react'
// components
import { Line } from 'react-chartjs'
import DatePicker from 'react-datepicker'
// utils
import _ from 'lodash'
import moment from 'moment'
import { chartData, chartOption } from 'store/helpers/ChartOptions'
// styles
import styles from './CampaignStats.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default class CampaignStats extends React.Component {
  static propTypes = {
    campaign: React.PropTypes.object.isRequired,
    getCampaign: React.PropTypes.func.isRequired,
    updateCampaign: React.PropTypes.func.isRequired,
    removeCampaign: React.PropTypes.func.isRequired,
    getCampaignStats: React.PropTypes.func.isRequired,
    routeParams: React.PropTypes.object.isRequired,
    campaignStats: React.PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(...props)

    this.state = {
      chartData: {},
      startDate: moment().subtract(1, 'month'),
      endDate: moment()
    }
  }

  componentDidMount () {
    const { getCampaign, getCampaignStats, routeParams } = this.props
    const campaign_id = routeParams.id
    getCampaign(campaign_id)
    const timezoneOffset = new Date().getTimezoneOffset()
    const startDate = this.state.startDate.format('YYYY-MM-DD')
    const endDate = this.state.endDate.format('YYYY-MM-DD')
    const params = {start_period: startDate, end_period: endDate, time_offset: timezoneOffset}
    getCampaignStats(campaign_id, params).then((stats) => {
      const dataForChart = chartData(stats.impressions, stats.conversions)
      this.setState({chartData: dataForChart})
    })
  }

  handleChangeDate (type, time) {
    const { getCampaignStats, routeParams } = this.props
    const campaign_id = routeParams.id
    const timezoneOffset = new Date(time).getTimezoneOffset()
    const date = time.format('YYYY-MM-DD')
    const startDate = type === 'startDate' ? date : this.state.startDate.format('YYYY-MM-DD')
    const endDate = type === 'endDate' ? date : this.state.endDate.format('YYYY-MM-DD')
    const params = {start_period: startDate, end_period: endDate, time_offset: timezoneOffset}
    getCampaignStats(campaign_id, params).then((stats) => {
      const dataForChart = chartData(stats.impressions, stats.conversions)
      this.setState({chartData: dataForChart})
    })
    this.setState({[type]: time})
  }

  lessThanEndDate (date) {
    return date < this.state.endDate
  }

  greaterThanStartDate (date) {
    return date > this.state.startDate
  }

  static Header = (({campaign}) =>
    <div className='row text-center chart-wrapper'>
      <div className='col-sm-2 col-sm-offset-2'>
        <h2>All Time</h2>
      </div>
      <div className='col-sm-2'>
        <span>Impressions</span>
        <br />
        <h2>{campaign && campaign.impressions_count}</h2>
      </div>
      <div className='col-sm-2'>
        <span>Conversions</span>
        <br />
        <h2>{campaign && campaign.conversions_count}</h2>
      </div>
      <div className='col-sm-2'>
        <span>CVR</span>
        <br />
        <h2>{(campaign.cvr ? Math.floor(campaign.cvr) : 0)}%</h2>
      </div>
    </div>
  )

  render () {
    const { campaign, campaignStats } = this.props
    return (
      <div className={cx('campaign-stats-content', 'content-wrapper')}>
        <div className='page-header page-header-default'>
          <div className='page-header-content'>
            <div className='page-title text-center'>
              <h4>
                {campaign && campaign.name}
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
                    <div className='row'>
                      <div className='col-sm-12'>
                        <CampaignStats.Header campaign={campaign} />
                      </div>
                    </div>
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
                            {campaignStats.total && <div className='stats-wrapper'>
                              <div>Impressions: {campaignStats.total.impressions}</div>
                              <div>Conversions: {campaignStats.total.conversions}</div>
                              <div>CVR: {campaignStats.total.cvr ? Math.floor(campaignStats.total.cvr) : 0}%</div>
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
          </div>
        </div>
      </div>
    )
  }
}
