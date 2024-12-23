import React from 'react'
import ReduxToastr from 'react-redux-toastr'
import MainModals from 'components/MainModals/MainModals'
import 'animate.css/animate.min.css'
import 'react-redux-toastr/src/less/index.less'
import 'styles/core.scss'
import 'styles/innerTheme/_main/colors.less'

export default class CoreLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    route: React.PropTypes.object.isRequired
  };

  static childContextTypes = {
    client: React.PropTypes.object.isRequired
  };

  getChildContext () {
    return {
      client: this.props.route.client
    }
  }

  render () {
    return (
      <div style={{'height': '100%'}}>
        <ReduxToastr timeOut={4000} position='top-right' />
        <div style={{'height': '100%'}}>
          {this.props.children}
        </div>
        <MainModals />
      </div>
    )
  }
}
