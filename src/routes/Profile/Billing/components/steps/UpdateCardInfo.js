import React from 'react'

export const UpdateCardInfo = ({payData}) => (
  <div className='col-md-10 col-md-offset-1'>
    <div className='row'>
      <div className='col-sm-12'>
        <div className='panel panel-flat'>
          <div className='panel-heading'>
            <h4 className='panel-title text-success'>Card details is successfully updated</h4>
          </div>
          <div className='panel-body'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='content-group'>
                    <h4>Credit card information:</h4>
                    <div className='table-responsive no-border'>
                      <table className='table'>
                        <tbody>
                          <tr>
                            <th>{payData.card.brand}</th>
                            <td className='text-right'>****-****-****-{payData.card.last4}</td>
                          </tr>
                          <tr>
                            <th>Expires:</th>
                            <td className='text-right'>{payData.card.exp_month}/{payData.card.exp_year}</td>
                          </tr>
                        </tbody>
                      </table>
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

UpdateCardInfo.propTypes = {
  payData: React.PropTypes.object.isRequired
}

export default UpdateCardInfo
