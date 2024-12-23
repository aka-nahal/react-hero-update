import React from 'react'
import Modal from 'containers/Modal/ModalContainer'
import SignUpModal from 'routes/TemplatesPage/TargetingPage/containers/ModalSignUpContainer'
import LoginModal from 'routes/TemplatesPage/TargetingPage/containers/ModalLoginContainer'
import ConnectMailApps from 'containers/ConnectMailApps/ConnectMailAppsContainer'

export default class MainModals extends React.Component {
  render () {
    return (
      <div>
        <Modal type='sign-up-modal' size='lg'>
          <SignUpModal />
        </Modal>
        <Modal type='login-modal' size='lg'>
          <LoginModal />
        </Modal>
        <Modal type='connect-mail-apps' size='lg'>
          <ConnectMailApps />
        </Modal>
      </div>
    )
  }
}
