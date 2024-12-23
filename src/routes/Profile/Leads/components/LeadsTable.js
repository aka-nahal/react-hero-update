import React from 'react'
// utils
import moment from 'moment'

export default class LeadsTable extends React.Component {
  static propTypes = {
    leads: React.PropTypes.array.isRequired
  }

  render () {
    const {leads} = this.props
    return (
      <table className='table datatable-basic table-bordered dataTable no-footer'>
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Name</th>
            <th>Email</th>
            <th>Collection Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => {
            return (
              <tr key={index}>
                <td>{lead.campaign.name}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{moment(lead.created_at).format('MM/DD/YYYY')}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}
