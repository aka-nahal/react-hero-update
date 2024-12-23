import InstallationContainer from './containers/InstallationPageContainer'

export default (store) => ({
  path: 'campaigns/:campaign/popups/:popup/installation',
  component: InstallationContainer,
  onEnter: (nextState, replace) => {
    const auth = store.getState().auth
    if (!auth.user) {
      replace('login')
    }
  }
})
