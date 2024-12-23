import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'account-settings',
  getComponent (nextState, next) {
    require.ensure([
      './containers/AccountSettingsContainer',
      './modules/profile'
    ], (require) => {
      /*  These modules are lazily evaluated using require hook, and
       will not loaded until the router invokes this callback. */
      const Profile = require('./containers/AccountSettingsContainer').default
      const reducer = require('./modules/profile').default

      injectReducer(store, { key: 'profile', reducer })

      next(null, Profile)
    })
  }
})
