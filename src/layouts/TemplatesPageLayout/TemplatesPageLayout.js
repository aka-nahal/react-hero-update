import React from 'react'
// components
import TemplatesPageHeader from 'containers/TempaltesPageHeader/TempaltesPageHeaderContainer'
// styles
import 'quill/dist/quill.snow.css'
import 'react-select/dist/react-select.min.css'
import styles from './TemplatesPageLayout.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default class TemplatesPageLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    sidebar: React.PropTypes.object.isRequired,
    params: React.PropTypes.object
  }

  render () {
    const { children, sidebar, params } = this.props
    return (
      <div id='templates-layout'className={classNames('pace-done', {'sidebar-mobile-main': sidebar.opened})}>
        <TemplatesPageHeader params={params} />
        <div className={cx('page-container', 'full-height')}>
          {children}
        </div>
      </div>
    )
  }
}
