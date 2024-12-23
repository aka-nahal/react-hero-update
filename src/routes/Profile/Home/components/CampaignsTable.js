import React from 'react'
// components
import ContentEditable from 'components/ContentEditable/ContentEditable'
import { Link } from 'react-router'
// utils
import _ from 'lodash'
// styles
import styles from './Home.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default class CampaignsTable extends React.Component {
  static propTypes = {
    campaigns: React.PropTypes.array.isRequired,
    sortByDomain: React.PropTypes.func.isRequired,
    sortType: React.PropTypes.string.isRequired,
    campaignsNames: React.PropTypes.array.isRequired,
    visibleInput: React.PropTypes.any,
    changeCampaignName: React.PropTypes.func.isRequired,
    removeCampaign: React.PropTypes.func.isRequired,
    changeVisible: React.PropTypes.func.isRequired,
    updateStatus: React.PropTypes.func.isRequired
  }

  render () {
    const { campaigns, sortByDomain, sortType, campaignsNames, visibleInput, changeCampaignName,
      removeCampaign, changeVisible, updateStatus } = this.props
    return (
      <table className='table datatable-basic table-bordered dataTable no-footer'>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Status
            </th>
            <th className={cx({'sorting': sortType === ''}, sortType === 'asc' ? 'sorting_desc' : 'sorting_asc')}
              onClick={sortByDomain.bind(this, sortType === 'asc' ? 'desc' : 'asc')}>
              Domain
            </th>
            <th>
              Impressions
            </th>
            <th>
              Conversions
            </th>
            <th>
              Conversion Rate
            </th>
            <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
        {campaigns.map((item, index) => {
          return (
            <tr key={index}>
              <td className={cx('table-cell-name', {'editableFocus': visibleInput === index})}>
                <ContentEditable html={`${campaignsNames[index]}`} disabled={visibleInput !== index}
                  onChange={changeCampaignName.bind(this, index)} />
                <i className='moon-pen6 text-muted'
                  onClick={changeVisible.bind(this, index)} />
              </td>
              <td>
                <span className={`label label-${item.status === 'active' ? 'success' : 'danger'}`}
                  onClick={updateStatus.bind(this, item)} style={{cursor: 'pointer'}}>
                  {item.status}
                </span>
              </td>
              <td>
                {item.domain}
              </td>
              <td>
                <span>{item.impressions_count}</span>
              </td>
              <td>
                <span>{item.conversions_count}</span>
              </td>
              <td>
                <span>{(item.cvr ? Math.floor(item.cvr) : 0)}%</span>
              </td>
              <td>
                <Link to={`/campaign-stats/${item.id}`} className='btn bg-green mt-5 mr-5'>Stats</Link>
                <Link to={`/campaigns/${item.id}/popups/${_.head(item.popups).id}/target_sets`}
                  className='btn bg-green mt-5 mr-5'>Targeting</Link>
                <Link to={{pathname: '/customize-template', query: {campaign: item.id,
                  popup: _.head(item.popups).id}}} className='btn bg-green mt-5 mr-5'>Design</Link>
                <button type='button' className='btn bg-green mt-5 mr-5'
                  onClick={removeCampaign.bind(this, item)}>
                  Delete
                </button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }
}
