import React from 'react'
import _ from 'lodash'

export const IntegrationTable = ({integrations, deleteIntegration, showModal, updateIntegration}) => {
  return (
    <table className='table datatable-basic table-bordered dataTable no-footer'>
      <thead>
        <tr>
          <th>Campaign Name</th>
          <th>Service</th>
          <th>Integration Data</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {integrations.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.campaign.name}</td>
            <td>{item.type.replace(/Integration$/, '')}</td>
            <td>{
              _.map(item.integration_data, (v, k) => { return `${k}: ${v}` }).join('; ')
            }</td>
            <td className='text-center text-muted'>
              <i className='fa fa-pencil mr-10 cursor-pointer'
                onClick={() => showModal('connect-mail-apps', {integration: item,
                 updateIntegration: updateIntegration})} />
              <i className='fa fa-close cursor-pointer' onClick={deleteIntegration.bind(this, item)} />
            </td>
          </tr>
          )
      })}
      </tbody>
    </table>
  )
}

IntegrationTable.propTypes = {
  integrations: React.PropTypes.array.isRequired,
  deleteIntegration: React.PropTypes.func.isRequired,
  showModal: React.PropTypes.func.isRequired
}

export default IntegrationTable
