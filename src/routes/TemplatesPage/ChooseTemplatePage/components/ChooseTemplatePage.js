import React from 'react'
import { PopupViewer } from 'store/helpers/PopupViewer'
// components
import Templates from './Templates'
import TemplatesPageSideBar from 'containers/TemplatesPageSideBar/TemplatesSideBarContainer'
import Spinner from 'components/Spinner/Spinner'

export default class ChooseTemplatePage extends React.Component {
  static propTypes = {
    templates: React.PropTypes.object.isRequired,
    getTemplates: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(...props)

    this.peakhero = new PopupViewer()
  }

  componentDidMount () {
    const { getTemplates, location } = this.props
    this.peakhero.initialize()
    const type = location.query.category
    const params = {category: type}

    getTemplates(params)
  }

  componentWillUnmount () {
    this.peakhero.deInitialize()
  }

  showPopUp (popup) {
    this.peakhero.showPopup(popup)
  }

  render () {
    const { templates } = this.props
    return (
      <div className='page-content'>
        <TemplatesPageSideBar />
        <div className='content-wrapper'>
          <div className='page-header page-header-default'>
            <div className='page-header-content'>
              <div className='page-title text-center'>
                <h3>
                  Pick the template you love
                </h3>
              </div>
            </div>
          </div>
          <div className='content'>
            <div className='row'>
              {templates.data.map((item, key) => {
                return (
                  <div className='col-lg-3 col-sm-6' key={key}>
                    <Templates showPopUp={::this.showPopUp} template={item} index={key} />
                  </div>
                  )
              })}
              {templates.loading && <Spinner />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
