import React from 'react'

export default class Field extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    field: React.PropTypes.object
  };

  render () {
    const {field, children} = this.props
    return (
      <div className={field.touched && field.invalid ? 'has-error' : null}>
        {children}
        {field.touched && field.error && field.error.split(';').map((message, index) =>
          <small key={index} className='help-block block'>{message}</small>
        )}
      </div>
    )
  }
}
