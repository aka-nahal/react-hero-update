import React from 'react'
import { Link } from 'react-router'
// styles
import styles from './ChooseTemplatePage.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export const Templates = ({ showPopUp, template, index }) => (
  <div className='thumbnail'>
    <div className='thumb'>
      <img src={template.preview_url} className='img-responsive' />
      <div className={cx('caption-overflow', 'inner-background')}>
        <span>
          <button type='button' className='btn border-white text-white btn-flat'
            onClick={() => showPopUp(template)}>
            Preview
          </button>
          <br />
          <Link to='/customize-template' query={{id: template.id}}
            className='btn border-white text-white btn-flat'>
            Choose This Template
          </Link>
        </span>
      </div>
    </div>
    <div className='caption'>
      <h5 className='no-margin'>
        {template.name}
      </h5>
    </div>
  </div>
)

Templates.propTypes = {
  showPopUp: React.PropTypes.func.isRequired,
  index: React.PropTypes.number,
  template: React.PropTypes.any
}

export default Templates
