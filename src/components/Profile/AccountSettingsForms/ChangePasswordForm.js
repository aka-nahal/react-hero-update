import React from 'react'
// components
import Field from 'components/Field/Field'
import { reduxForm } from 'redux-form'

@reduxForm({
  form: 'change-password',
  fields: ['password', 'password_confirmation', 'current_password']
})
export default class ChangePasswordForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool,
    error: React.PropTypes.func
  };

  render () {
    const { fields: {current_password, password_confirmation, password}, handleSubmit, error } = this.props
    return (
      <form className={'form-horizontal' + (error ? ' has-error' : '')} onSubmit={handleSubmit} role='form'>
        <div className='form-group'>
          <Field field={current_password}>
            <label className='col-sm-3 control-label text-right'>Current Password</label>
            <div className='col-sm-8'>
              <input type='password' placeholder='Current Password' className='form-control' {...current_password} />
            </div>
          </Field>
        </div>
        <div className='form-group'>
          <Field field={password}>
            <label className='col-sm-3 control-label text-right'>New Password</label>
            <div className='col-sm-8'>
              <input type='password' placeholder='Password' className='form-control' {...password} />
            </div>
          </Field>
        </div>
        <div className='form-group'>
          <Field field={password_confirmation}>
            <label className='col-sm-3 control-label text-right'>Password confirmation</label>
            <div className='col-sm-8'>
              <input type='password' placeholder='Password confirmation' className='form-control'
                {...password_confirmation} />
            </div>
          </Field>
        </div>
        <div className='form-group'>
          <div className='col-sm-offset-3 col-sm-8 text-center'>
            <button className='btn bg-green btn-xlg text-uppercase'
              disabled={!password.value || !current_password.value || !password_confirmation.value} type='submit'>
              Save
            </button>
          </div>
        </div>
      </form>
    )
  }
}
