// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import MainLayout from '../layouts/MainLayout/MainLayout'
import InnerLayout from '../layouts/InnerLayout/InnerLayout'
import ProfileLayout from '../containers/ProfileLayout/ProfileLayoutContainer'
import TemplatesPageLayout from '../containers/TemplatesPageLayout/TemplatesPageLayoutContainer'
import Home from './Home'
import { loadCurrentUser } from 'store/modules/auth'

export const createRoutes = (store) => {
/*  Note: Instead of using JSX, we are using react-router PlainRoute,
    a simple javascript object to provide route definitions.
    When creating a new async route, pass the instantiated store!   */

  const mainLayoutRoutes = {
    component: MainLayout,
    indexRoute: Home,
    getChildRoutes (location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./Features').default,
          require('./Pricing').default
        ])
      })
    }
  }

  const innerLayoutRoutes = {
    component: InnerLayout,
    getChildRoutes (location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./Auth/SignUp').default,
          require('./Auth/ChangePassword').default,
          require('./Auth/RecoveryPassword').default,
          require('./Auth/Login').default
        ])
      })
    }
  }

  const profileLayoutRoutes = {
    component: ProfileLayout,
    onEnter: (nextState, replace) => {
      const auth = store.getState().auth
      if (!auth.user) {
        replace('login')
      }
    },
    getChildRoutes (location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./Profile/Home').default,
          require('./Profile/AccountSettings').default(store),
          require('./Profile/CampaignStats').default,
          require('./Profile/Leads').default,
          require('./Profile/Integrations').default,
          require('./Profile/Billing').default,
          require('./Profile/Installation').default,
          require('./Profile/CustomPlan').default
        ])
      })
    }
  }

  const templatesLayoutRoutes = {
    component: TemplatesPageLayout,
    getChildRoutes (location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./TemplatesPage/ChooseTemplatePage').default,
          require('./TemplatesPage/CustomizeTemplatePage').default,
          require('./TemplatesPage/TargetingPage').default,
          require('./TemplatesPage/InstallationPage').default(store)
        ])
      })
    }
  }

  const routes = {
    path: '/',
    component: CoreLayout,
    onEnter: preloadUser,
    client: store.client,
    childRoutes: [
      mainLayoutRoutes,
      innerLayoutRoutes,
      profileLayoutRoutes,
      templatesLayoutRoutes,
      require('./NotFound').default
    ]
  }

  function preloadUser (nextState, replace, proceed) {
    const { user, data } = store.getState().auth
    if (!user) {
      if (data.uid) {
        store.dispatch(loadCurrentUser())
          .then(() => proceed())
          .catch(() => proceed())
        return
      }
    }
    proceed()
  }

  return routes
}

export default createRoutes
