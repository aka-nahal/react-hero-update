import React from 'react'
// components
import Select from 'react-select'
import { Pagination } from 'react-bootstrap'
import IntegrationTable from './IntegrationTable'
import Spinner from 'components/Spinner/Spinner'
import { toastr } from 'react-redux-toastr'
// utils
import _ from 'lodash'
// constants
import { mailServices } from './Constants'

export default class Integrations extends React.Component {
  static propTypes = {
    campaigns: React.PropTypes.array.isRequired,
    getCampaigns: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired,
    integrations: React.PropTypes.object.isRequired,
    showModal: React.PropTypes.func.isRequired,
    getIntegrations: React.PropTypes.func.isRequired,
    removeIntegration: React.PropTypes.func.isRequired,
    updateIntegration: React.PropTypes.func.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(...props)

    this.state = {
      service: '',
      selectedCampaign: ''
    }
  }

  componentDidMount () {
    const { campaigns, getCampaigns, getIntegrations, location } = this.props
    const params = _.isEmpty(location.query) ? this.getParams() : location.query
    getIntegrations(params)
    if (_.isEmpty(campaigns)) return getCampaigns()
  }

  onFilterChange (type, target) {
    const { router } = this.context
    const { getIntegrations } = this.props
    this.setState({[type]: target || ''})
    const query = this.getParams(1)
    type === 'selectedCampaign'
      ? query['q[campaign_id_eq]'] = target && target.id ? target.id : undefined
      : query.type_eq = target && target.value ? target.value : undefined
    router.push({
      pathname: '/email-integrations',
      query: query
    })
    getIntegrations(query)
  }

  getParams (page) {
    const { integrations } = this.props
    return {
      type_eq: this.state.service.value === '' ? undefined : this.state.service.value,
      'q[campaign_id_eq]': _.get(this.state, 'selectedCampaign.id') === '' ? undefined
        : _.get(this.state, 'selectedCampaign.id'),
      page: page || integrations.page,
      per_page: integrations.perPage
    }
  }

  changePage (page) {
    const { router } = this.context
    const { getIntegrations } = this.props
    const params = this.getParams(page)
    getIntegrations(params)
    router.push({
      pathname: '/email-integrations',
      query: params
    })
  }

  deleteIntegration (item) {
    const { removeIntegration } = this.props
    const toastrConfirmOptions = {
      onOk: () => removeIntegration(item).then(() => {
        toastr.success('', 'Your integration has been successfully deleted')
      })
    }
    toastr.confirm('Are you sure?', toastrConfirmOptions)
  }

  render () {
    const { campaigns, integrations, location } = this.props
    const pagesCount = Math.ceil(integrations.total / integrations.perPage)
    return (
      <div className='content-wrapper'>
        <div className='page-header page-header-default'>
          <div className='page-header-content'>
            <div className='page-title text-left'>
              <h4>
                <i className='fa fa-arrow-circle-o-left position-left' />
                Email integrations
              </h4>
            </div>
          </div>
        </div>
        <div className='content'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='panel'>
                <div className='panel-body'>
                  <div className='row'>
                    <div className='col-sm-4'>
                      <div className='form-group'>
                        <label className='control-label'>Filter By Campaign</label>
                        <Select
                          name='campaigns-filter'
                          value={parseFloat(location.query['q[campaign_id_eq]']) || this.state.selectedCampaign}
                          valueKey='id'
                          labelKey='name'
                          clearable={false}
                          options={[{name: 'All', id: ''}].concat(campaigns)}
                          onChange={this.onFilterChange.bind(this, 'selectedCampaign')} />
                      </div>
                    </div>
                    <div className='col-sm-4'>
                      <div className='form-group'>
                        <label className='control-label'>Filter By Mail Platform</label>
                        <Select
                          name='campaigns-filter'
                          value={location.query['q[type_eq]'] || this.state.service}
                          clearable={false}
                          onChange={this.onFilterChange.bind(this, 'service')}
                          options={mailServices} />
                      </div>
                    </div>
                    <div className='col-sm-4 text-right'>
                      <button className='btn bg-green btn-xlg' type='button'
                        onClick={() => this.props.showModal('connect-mail-apps')}>+ Add new</button>
                    </div>
                    <div className='col-sm-12 mt-25'>
                      {_.get(integrations, 'data.length') !== 0 && !integrations.loading &&
                        <div className='table-responsive'>
                          <IntegrationTable integrations={integrations.data}
                            deleteIntegration={::this.deleteIntegration} showModal={this.props.showModal}
                            updateIntegration={this.props.updateIntegration} />
                        </div>}
                      {integrations.loading && <Spinner />}
                      {_.get(integrations, 'data.length') === 0 && !integrations.loading &&
                        <div className='no-items-placeholder'>
                          <h4 className='text-center'>There are no integrated email services to display</h4>
                        </div>}
                      {pagesCount > 1 && <Pagination
                        prev next ellipsis boundaryLinks
                        className='pagination-flat mt-20'
                        maxButtons={5}
                        items={pagesCount}
                        activePage={parseFloat(integrations.page)}
                        onSelect={::this.changePage} />}
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
