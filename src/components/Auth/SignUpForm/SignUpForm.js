import React from 'react'
import { reduxForm } from 'redux-form'
// components
import Field from 'components/Field/Field'

@reduxForm({
  form: 'sign-up',
  fields: ['first_name', 'email', 'password']
})
export default class SignUpForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    values: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool,
    error: React.PropTypes.any
  };

  render () {
    const { fields: {first_name, email, password}, handleSubmit, submitting, error } = this.props
    return (
      <form className={'signup-form' + (error ? ' has-error' : '')} onSubmit={handleSubmit} role='form'>
        <div className='form-group user'>
          <Field field={first_name}>
            <input type='text' className='form-control'
              placeholder='First name' {...first_name} />
          </Field>
        </div>
        <div className='form-group email'>
          <Field field={email}>
            <input type='email' className='form-control'
              placeholder='Email' {...email} />
          </Field>
        </div>
        <div className='form-group password'>
          <Field field={password}>
            <input type='password' className='form-control'
              placeholder='Password' {...password} />
          </Field>
        </div>
        <button type='submit' className='btn btn-block btn-cta-primary' disabled={submitting}>Sign up</button>
        <p className='note text-left'>By signing up, you agree to our terms of services and privacy policy.</p>
      </form>
    )
  }
}
