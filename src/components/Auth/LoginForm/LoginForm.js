import React from 'react'
import { reduxForm } from 'redux-form'
// components
import Field from 'components/Field/Field'
import { Link } from 'react-router'

@reduxForm({
  form: 'login',
  fields: ['email', 'password', 'remember_me']
})
export default class LoginForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    values: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    handleRecovery: React.PropTypes.func,
    submitting: React.PropTypes.bool,
    error: React.PropTypes.any
  };

  render () {
    const { fields: {email, password, remember_me}, handleSubmit, submitting, error } = this.props
    return (
      <form className={'login-form' + (error ? ' has-error' : '')} onSubmit={handleSubmit} role='form'>
        <div className='form-group email'>
          <Field field={email}>
            <input type='email' className='form-control login-email'
              placeholder='Email' {...email} />
          </Field>
        </div>
        <div className='form-group password'>
          <Field field={password}>
            <input type='password' className='form-control login-password'
              placeholder='Password' {...password} />
            <p className='forgot-password text-left'>
              <Link to='recovery-password'>Forgot password?</Link>
            </p>
          </Field>
        </div>
        <button type='submit' className='btn btn-block btn-cta-primary' disabled={submitting}>Log in</button>
        <div className='checkbox remember text-left'>
          <Field field={remember_me}>
            <label>
              <input type='checkbox' {...remember_me} /> Remember me
            </label>
          </Field>
        </div>
      </form>
    )
  }
}
