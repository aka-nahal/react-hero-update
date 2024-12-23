import React from 'react'
import { reduxForm } from 'redux-form'
// components
import Field from 'components/Field/Field'

@reduxForm({
  form: 'reset-password',
  fields: ['password', 'password_confirmation']
})
export default class ChangePasswordForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool,
    error: React.PropTypes.func
  };

  render () {
    const { fields: {password, password_confirmation}, handleSubmit, submitting, error } = this.props
    return (
      <form className={'resetpass-form' + (error ? ' has-error' : '')} onSubmit={handleSubmit} role='form'>
        <div className='form-group password'>
          <Field field={password}>
            <label className='sr-only'>Password</label>
            <input type='password' className='form-control'
              placeholder='Password' {...password} />
          </Field>
        </div>
        <div className='form-group password'>
          <Field field={password_confirmation}>
            <label className='sr-only'>Password confirmation</label>
            <input type='password' className='form-control'
              placeholder='Password confirmation' {...password_confirmation} />
          </Field>
        </div>
        <button type='submit' className='btn btn-block btn-cta-primary' disabled={submitting}>Change Password</button>
      </form>
    )
  }
}
