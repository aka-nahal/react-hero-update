import React from 'react'
// components
import Field from 'components/Field/Field'
import { reduxForm } from 'redux-form'

@reduxForm({
  form: 'update-personal-details',
  fields: ['first_name', 'last_name', 'email', 'phone']
})
export default class PersonalDetailsForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    values: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool,
    error: React.PropTypes.any
  };

  render () {
    const { fields: {first_name, last_name, phone, email}, handleSubmit, error } = this.props
    return (
      <form className={'form-horizontal' + (error ? ' has-error' : '')} onSubmit={handleSubmit} role='form'>
        <div className='form-group'>
          <Field field={first_name}>
            <label className='col-sm-3 control-label text-right'>First Name</label>
            <div className='col-sm-8'>
              <input type='text' placeholder='First Name' className='form-control' {...first_name} />
            </div>
          </Field>
        </div>
        <div className='form-group'>
          <Field field={last_name}>
            <label className='col-sm-3 control-label text-right'>Last Name</label>
            <div className='col-sm-8'>
              <input type='text' placeholder='Last Name' className='form-control' {...last_name} />
            </div>
          </Field>
        </div>
        <div className='form-group'>
          <label className='col-sm-3 control-label text-right'>Phone</label>
          <div className='col-sm-8'>
            <Field field={phone}>
              <input type='tel' placeholder='Phone' className='form-control' {...phone} />
            </Field>
          </div>
        </div>
        <div className='form-group'>
          <label className='col-sm-3 control-label text-right'>Email</label>
          <div className='col-sm-8'>
            <Field field={email}>
              <input type='email' placeholder='Email' className='form-control' {...email} />
            </Field>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-offset-3 col-sm-8 text-center'>
            <button className='btn bg-green btn-xlg text-uppercase' type='submit'>Save</button>
          </div>
        </div>
      </form>
    )
  }
}
