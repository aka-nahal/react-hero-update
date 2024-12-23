import React from 'react'
// components
import ChangePasswordForm from 'components/Profile/AccountSettingsForms/ChangePasswordForm'
import PersonalDetailsForm from 'components/Profile/AccountSettingsForms/PersonalDetailsForm'
import { toastr } from 'react-redux-toastr'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
// utils
import _ from 'lodash'
import moment from 'moment'
import handleResponseErrors from 'utils/handleResponseErrors'

export default class AccountSettings extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    profile: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
    loadProfile: React.PropTypes.func.isRequired,
    updateProfile: React.PropTypes.func.isRequired,
    resetPassword: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
    loadCurrentUser: React.PropTypes.func.isRequired
  };

  static contextTypes = {
    client: React.PropTypes.object.isRequired
  };

  componentDidMount () {
    const { user, loadProfile } = this.props
    loadProfile(user.id)
  }

  changePassword (data) {
    const { resetPassword, reset } = this.props
    return resetPassword(data)
      .then(() => {
        toastr.success('Password changed', 'Password successfully changed')
        reset('change-password')
      })
      .catch((response) => handleResponseErrors(response, ['full_messages']))
  }

  updatePersonalData (data) {
    const { user, updateProfile, reset } = this.props
    return updateProfile(user.id, data)
      .then(() => {
        toastr.success('', 'Personal details successfully updated')
        reset('update-personal-details')
      })
      .catch((response) => handleResponseErrors(response))
  }

  removeSubscription () {
    const { client } = this.context
    const { loadCurrentUser } = this.props
    const toastrConfirmOptions = {
      onOk: () => client.del('/subscriptions')
        .then(() => {
          toastr.success('', 'Subscribe is successfully! canceled')
          loadCurrentUser()
        })
        .catch((response) => {
          handleResponseErrors(response, ['base'])
        })
    }
    toastr.confirm('Are you sure?', toastrConfirmOptions)
  }

  render () {
    const { user } = this.props
    const initialValues = _.pickBy(user)
    return (
      <div className='content-wrapper'>
        <div className='page-header page-header-default'>
          <div className='page-header-content'>
            <div className='page-title text-left'>
              <h4>
                <i className='fa fa-arrow-circle-o-left position-left' />
                Account Settings:
              </h4>
            </div>
          </div>
        </div>
        <div className='content text-left'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='panel panel-body border-top-primary'>
                <div className='container-fluid'>
                  <div className='row'>
                    <div className='col-sm-12 col-xs-12 col-md-12 col-lg-8'>
                      <div className='col-lg-6 col-md-6 col-sm-6'>
                        <h4>
                          <span className='standout'>Current Plan:</span>&nbsp;
                          {_.toUpper(_.get(user, 'subscription.plan.name') || 'trial')}
                        </h4>
                        <h4>
                          <span className='standout'>Expires:</span> {moment(_.get(user, 'subscription.expires_at')).format('MMM DD YYYY')}
                        </h4>
                        <h4><span className='standout'>Used Impressions:</span> {_.get(user, 'subscription.used_impressions_count')}</h4>
                        <h4><span className='standout'>Status:</span> {_.get(user, 'subscription.status')}</h4>
                      </div>
                      {(_.get(user, 'subscription.last_charged_at') ||
                      _.get(user, 'subscription.next_payment_time')) &&
                        <div className='col-lg-6 col-md-6 col-sm-6'>
                          <h4>Payment Info:</h4>
                          {_.get(user, 'subscription.last_charged_at') && <h5>
                            <span className='standout'>Last Payment Date:</span>&nbsp;
                            {moment(_.get(user, 'subscription.last_charged_at')).format('MMM DD YYYY')}
                          </h5>}
                          {_.get(user, 'subscription.next_payment_time') && <h5>
                            <span className='standout'>Next Payment Date:</span>&nbsp;
                            {moment(_.get(user, 'subscription.next_payment_time')).format('MMM DD YYYY')}
                          </h5>}
                        </div>}
                    </div>
                    {(user.stripe_user_id && user.subscription.status !== 'canceled' && !user.subscription.cancel_at_period_end) &&
                      <div className='col-lg-4 col-md-4 col-sm-4 col-sm-offset-4 col-md-offset-4 text-center
                       col-lg-offset-0'>
                        <button type='button' className='btn btn-default btn-xlg mb-20'
                          onClick={::this.removeSubscription}>
                          Cancel Subscription
                        </button>
                      </div>}
                    {(user.stripe_user_id && user.subscription.status !== 'canceled' && user.subscription.cancel_at_period_end) && <div>
                      <OverlayTrigger placement='top'
                        overlay={<Tooltip id='domain'>You still able to use service till the end of the current payment period
                                </Tooltip>}>
                        <label className='label label-default'>Subscription was canceled</label>
                      </OverlayTrigger>
                      </div>}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='panel panel-flat'>
                <div className='panel-heading'>
                  <h4>Personal Details:</h4>
                </div>
                <div className='panel-body'>
                  <PersonalDetailsForm onSubmit={::this.updatePersonalData} initialValues={initialValues} />
                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='panel panel-flat'>
                <div className='panel-heading'>
                  <h4>Change Password:</h4>
                </div>
                <div className='panel-body'>
                  <ChangePasswordForm onSubmit={::this.changePassword} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
