import React from 'react'
// utils
import _ from 'lodash'
import moment from 'moment'

export const Order = ({selectedPlan, payData}) => (
  <div className='container-fluid'>
    <div className='row'>
      <div className='col-md-10 col-md-offset-1'>
        <div className='panel panel-flat'>
          <div className='panel-heading'>
            <h4 className='panel-title text-success'>Plan has been successfully purchased and activated</h4>
          </div>
          <div className='panel-body'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='content-group'>
                    <div className='container-fluid'>
                      <div className='row'>
                        <div className='table-responsive no-border'>
                          <table className='table'>
                            <tbody>
                            <tr>
                              <th className='no-border'>
                                <h4>{_.capitalize(selectedPlan.name)}</h4>
                                <small className='text-muted'>
                                  {selectedPlan.interval === 'year' ? 'yearly payment' : 'monthly payment'}
                                </small>
                              </th>
                              <td className='no-border'>
                                <h4>
                                  {`${selectedPlan.price / 100}$`}
                                </h4>
                              </td>
                            </tr>
                            <tr>
                              <th className='no-border'>Successfully paid:</th>
                              <td className='no-border'>{payData.date.format('MMM DD YYYY')}</td>
                            </tr>
                            <tr>
                              <th className='no-border'>Paid till:</th>
                              <td className='no-border'>{selectedPlan.interval === 'year'
                                ? <span>{moment(payData.date).add(1, 'year').format('MMM DD YYYY')}</span>
                                : <span>{moment(payData.date).add(1, 'month').format('MMM DD YYYY')}</span>}
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-5 col-md-offset-1 col-sm-6'>
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

Order.propTypes = {
  selectedPlan: React.PropTypes.object.isRequired,
  payData: React.PropTypes.object.isRequired
}

export default Order
