import React from 'react'
// styles
import 'styles/innerTheme/_main/components.less'
import 'styles/innerTheme/_main/core.less'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './ProfileLayout.scss'
import classNames from 'classnames/bind'

// components
import ProfileHeader from 'containers/ProfileHeader/ProfileHeaderContainer'
import MainSideBar from 'containers/MainSideBar/MainSideBarContainer'

const cx = classNames.bind(styles)

export const ProfileLayout = ({ children, sidebar }) => (
  <div className={cx('pace-done', {'sidebar-xs': !sidebar.opened},
    {'sidebar-mobile-main': sidebar.mobileOpened})} style={{'height': '100%'}}>
    <ProfileHeader />
    <div className={cx('page-container', 'full-height')}>
      <div className='page-content'>
        <MainSideBar />
        {children}
      </div>
    </div>
  </div>
)

ProfileLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
  sidebar: React.PropTypes.object.isRequired
}

export default ProfileLayout
