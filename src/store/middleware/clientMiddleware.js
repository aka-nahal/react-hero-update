export default function clientMiddleware (client) {
  return ({dispatch, getState}) => {
    return (next) => (action) => {
      // if action is a func call it with attributes
      if (typeof action === 'function') {
        return action(dispatch, getState, client)
      }

      // if action had a promise prop dispatch 3 actions
      const { promise, types, ...rest } = action // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action)
      }

      const [REQUEST, SUCCESS, FAILURE] = types
      next({...rest, type: REQUEST})

      const immutablePromise = promise(client)
      immutablePromise.then(
        (result) => next({...rest, result, type: SUCCESS}),
        (error) => next({...rest, error, type: FAILURE})
      ).catch((error) => {
        console.error('MIDDLEWARE ERROR:', error)
        next({...rest, error, type: FAILURE})
      })
      return immutablePromise
    }
  }
}
