import React from 'react'
import { reduxForm } from 'redux-form'
// components
import Field from 'components/Field/Field'

@reduxForm({
  form: 'recovery',
  fields: ['email']
})
export default class RecoveryPasswordForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool,
    error: React.PropTypes.func
  };

  render () {
    const { fields: {email}, handleSubmit, submitting, error } = this.props
    return (
      <form className={'resetpass-form' + (error ? ' has-error' : '')} onSubmit={handleSubmit} role='form'>
        <div className='form-group email'>
          <Field field={email}>
            <input type='email' className='form-control resetpass-email'
              placeholder='Email' {...email} />
          </Field>
        </div>
        <button type='submit' className='btn btn-block btn-cta-primary' disabled={submitting}>Remind Me</button>
      </form>
    )
  }
}
