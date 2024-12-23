import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import ApiClient from './helpers/ApiClient'
import clientMiddleware from './middleware/clientMiddleware.js'

import reducers from './reducers'

export default (initialState = {}, history) => {
  const client = new ApiClient()

  let middleware = applyMiddleware(
    clientMiddleware(client),
    routerMiddleware(history)
  )

  // Use DevTools chrome extension in development
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension())
    }
  }

  const store = createStore(reducers(), initialState, middleware)

  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default

      store.replaceReducer(reducers)
    })
  }

  store.client = client

  return store
}
