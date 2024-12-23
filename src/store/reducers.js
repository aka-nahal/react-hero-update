import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import auth from './modules/auth'
import sidebar from './modules/sidebar'
import modals from './modules/modals'
import templates from './modules/templates'
import popups from './modules/popups'
import targetSets from './modules/targetSets'
import campaigns from './modules/campaigns'
import leads from './modules/leads'
import stats from './modules/stats'
import integrations from './modules/integrations'

export const reducers = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    auth,
    sidebar,
    form: formReducer,
    modals,
    router,
    templates,
    campaigns,
    leads,
    popups,
    targetSets,
    stats,
    integrations,
    toastr: toastrReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(reducers(store.asyncReducers))
}

export default reducers
