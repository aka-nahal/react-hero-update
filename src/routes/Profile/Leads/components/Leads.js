import React from 'react'
// utils
import _ from 'lodash'
import moment from 'moment'
// components
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import { Pagination } from 'react-bootstrap'
import LeadsTable from './LeadsTable'
import { toastr } from 'react-redux-toastr'
import Spinner from 'components/Spinner/Spinner'
// styles
import styles from './Leads.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default class Leads extends React.Component {
  static propTypes = {
    leads: React.PropTypes.object.isRequired,
    leadsTotalCount: React.PropTypes.number.isRequired,
    getLeads: React.PropTypes.func.isRequired,
    campaigns: React.PropTypes.array.isRequired,
    getCampaigns: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired,
    showModal: React.PropTypes.func.isRequired,
    leadsLoading: React.PropTypes.bool.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    client: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(...props)
    const perPageVariants = [20, 50, 100].map(num => ({value: num, label: `${num} per page`}))

    this.state = {
      perPage: '',
      perPageVariants: perPageVariants,
      startDate: moment().subtract(1, 'month'),
      endDate: moment(),
      selectedCampaign: ''
    }
  }

  componentDidMount () {
    const { campaigns, getCampaigns, getLeads, location } = this.props
    const params = _.isEmpty(location.query) ? this.getParams() : location.query
    getLeads(params)
    if (_.isEmpty(campaigns)) return getCampaigns()
  }

  handleChange (fieldName, value) {
    const { getLeads } = this.props
    const defaultValues = { page: 1 }
    if (fieldName === 'startDate' || fieldName === 'endDate') {
      defaultValues[fieldName] = value.format('YYYY-MM-DD')
    } else {
      defaultValues[fieldName] = value.value === '' ? undefined : fieldName === 'selectedCampaign'
        ? value.id : value.value
    }
    const { router } = this.context
    this.setState({[fieldName]: value})
    const params = this.getParams(defaultValues)
    router.push({
      pathname: '/leads',
      query: params
    })

    getLeads(params)
  }

  changePage (page) {
    const { router } = this.context
    const { getLeads } = this.props
    const defaultValues = {page: page}
    const params = this.getParams(defaultValues)
    getLeads(params)
    router.push({
      pathname: '/leads',
      query: params
    })
  }

  getParams (defaultValues) {
    const { leads } = this.props
    return {
      start_period: _.get(defaultValues, 'startDate') || leads.startDate.format('YYYY-MM-DD'),
      end_period: _.get(defaultValues, 'endDate') || leads.endDate.format('YYYY-MM-DD'),
      campaign_id: _.get(defaultValues, 'selectedCampaign') || undefined,
      page: _.get(defaultValues, 'page') || leads.page,
      per_page: _.get(defaultValues, 'perPage') || leads.perPage
    }
  }

  lessThanEndDate (date) {
    return date <= this.state.endDate
  }

  greaterThanStartDate (date) {
    return date >= this.state.startDate
  }

  connectMailApps () {
    const { showModal } = this.props
    showModal('connect-mail-apps')
  }

  exportToCSV () {
    const { client } = this.context
    client.get('/leads/export_leads')
      .then((response) => {
        window.open(response.file)
      })
      .catch(() => toastr.error('', 'Sorry, something went wrong'))
  }

  render () {
    const { leads, leadsTotalCount, campaigns, leadsLoading, location } = this.props
    const pagesCount = Math.ceil(leadsTotalCount / leads.perPage)
    return (
      <div className='content-wrapper'>
        <div className='page-header page-header-default'>
          <div className='page-header-content'>
            <div className='page-title text-left'>
              <h4>
                <i className='fa fa-arrow-circle-o-left position-left' />
                Collected Emails
              </h4>
              <div className={cx('text-right', 'leads-header-actions')}>
                <button type='button' className='btn btn-success' onClick={::this.connectMailApps}>
                  <span className='hidden-xs'>Connect To Mail Apps</span>
                  <span className='visible-xs'>Add Mail Apps</span>
                </button>
                <button type='button' className='btn btn-default ml-10' onClick={::this.exportToCSV}>
                  <span className='hidden-xs'>Export To CSV</span>
                  <span className='visible-xs'>Export CSV</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='content'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='panel panel-flat'>
                <div className='panel-heading'>
                  <div className='row'>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <label className='control-label'>Campaign</label>
                        <Select
                          name='campaign-filter'
                          valueKey='id'
                          labelKey='name'
                          options={[{name: 'All', id: ''}].concat(campaigns)}
                          value={parseFloat(location.query.campaign_id) || this.state.selectedCampaign}
                          clearable={false}
                          onChange={this.handleChange.bind(this, 'selectedCampaign')}
                        />
                      </div>
                    </div>
                    <div className='col-md-5'>
                      <div className='form-group'>
                        <label className='control-label'>Period</label>
                        <div className='date-period'>
                          <DatePicker
                            selected={this.state.startDate}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            filterDate={::this.lessThanEndDate}
                            className='form-control'
                            onChange={::this.handleChange.bind(this, 'startDate')}
                          />
                          <span className='dash'>—</span>
                          <DatePicker
                            selected={this.state.endDate}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            filterDate={::this.greaterThanStartDate}
                            className='form-control'
                            onChange={::this.handleChange.bind(this, 'endDate')}
                          />
                          <i className='fa fa-calendar' />
                        </div>
                      </div>
                    </div>
                    <div className='col-md-3'>
                      <div className='form-group'>
                        <label className='control-label'>Show</label>
                        <Select
                          name='per-page'
                          options={this.state.perPageVariants}
                          value={parseFloat(location.query.per_page) || leads.perPage}
                          clearable={false}
                          onChange={::this.handleChange.bind(this, 'perPage')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='panel-body'>
                  {leads.data.length > 0 && !leadsLoading && <LeadsTable leads={leads.data} />}
                  {leadsLoading && <Spinner />}
                  {leads.data.length === 0 && !leadsLoading && <div className='no-items-placeholder'>
                    <h4 className='text-center'>There are no collected emails to display</h4>
                  </div>}
                  {pagesCount > 1 && <Pagination
                    prev next ellipsis boundaryLinks
                    className='pagination-flat mt-20'
                    maxButtons={5}
                    items={pagesCount}
                    activePage={parseFloat(leads.page)}
                    onSelect={::this.changePage}
                  />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
