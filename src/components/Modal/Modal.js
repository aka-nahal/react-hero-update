import React, { PropTypes } from 'react'
import { Modal as BootstrapModal } from 'react-bootstrap'

export default class Modal extends React.Component {
  static propTypes = {
    // state
    modals: PropTypes.object.isRequired,
    // props
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.object,
    // actions
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.state = {
      show: true
    }
  }

  hide = () => {
    const { hideModal, type } = this.props
    hideModal(type)
  }

  render () {
    const { modals, type, title, className, size, children } = this.props
    const isVisible = modals[type]
    const titleStyle = {
      fontSize: '20px'
    }

    return (
      <BootstrapModal show={isVisible} onHide={this.hide} dialogClassName={className} bsSize={size} bsStyle='primary'>
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title style={titleStyle}>
            <span>{title}</span>
          </BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>
          {children}
        </BootstrapModal.Body>
      </BootstrapModal>
    )
  }
}
