import React from 'react'
// components
import { Nav } from 'react-bootstrap'
import { PopupViewer } from 'store/helpers/PopupViewer'
// styles
import styles from '../CustomizeTemplate.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default class RightSidebar extends React.Component {
  static propTypes = {
    templates: React.PropTypes.object.isRequired,
    switchTemplate: React.PropTypes.func.isRequired,
    getTemplates: React.PropTypes.func.isRequired,
    openRightSidebar: React.PropTypes.bool.isRequired
  }

  constructor (props) {
    super(...props)

    this.peakhero = new PopupViewer()
  }

  componentDidMount () {
    const { getTemplates } = this.props
    this.peakhero.initialize()
    getTemplates()
  }

  componentWillUnmount () {
    this.peakhero.deInitialize()
  }

  showPopUp (popup) {
    this.peakhero.showPopup(popup)
  }

  render () {
    const { templates, switchTemplate, openRightSidebar } = this.props
    return (
      <div className={cx('sidebar sidebar-main text-left', {'templates-open': openRightSidebar},
       'customize-right-sidebar')}>
        <div className={cx('sidebar-content', 'sidebar-templates')}>
          <div className='sidebar-category sidebar-category-visible'>
            <div className='category-content no-padding'>
              <Nav className='navigation navigation-main navigation-accordion'>
                <li className='navigation-header'>
                  <span>
                    Templates
                  </span>
                </li>
                {templates.data.map((template, index) => {
                  return (
                    <div key={index} className={cx('col-sm-12', 'sidebar-template-wrapper')}>
                      <div className='thumbnail'>
                        <div className='thumb'>
                          <img src={template.preview_url} className='img-responsive' />
                          <div className={cx('caption-overflow', 'inner-background')}>
                            <span>
                              <button type='button' className='btn border-white text-white btn-flat'
                                onClick={() => this.showPopUp(template)}>
                                Preview
                              </button>
                              <br />
                              <a href='#' onClick={switchTemplate.bind(this, template.id)} className='btn border-white
                                text-white btn-flat'>
                                Choose This Template
                              </a>
                            </span>
                          </div>
                        </div>
                        <div className='caption'>
                          <h5 className='no-margin text-center'>
                            {template.name}
                          </h5>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Nav>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
