import { createAction, handleActions } from 'redux-actions'
import { push } from 'react-router-redux'
import { setAuthData, getAuthData, clearData } from '../helpers/authData'
import authRequest from '../helpers/authRequest'
import { mailAuthRequest } from '../helpers/mailAuthRequest'
import { oAuthRequest } from '../helpers/oAuthRequest'

// ------------------------------------
// Constants
// ------------------------------------
const SET_AUTH_DATA = 'auth/SET_AUTH_DATA'
const SET_CURRENT_USER = 'auth/SET_CURRENT_USER'
const UPDATE_CURRENT_USER = 'auth/UPDATE_CURRENT_USER'
const LOGOUT = 'auth/LOGOUT'

const initialState = {
  data: getAuthData(),
  user: null
}

// ------------------------------------
// Actions
// ------------------------------------
const setAuthDataAction = createAction(SET_AUTH_DATA)
const setCurrentUserAction = createAction(SET_CURRENT_USER)
const logoutAction = createAction(LOGOUT)
export const updateCurrentUser = createAction(UPDATE_CURRENT_USER)

// ------------------------------------
// Action creators
// ------------------------------------
export function logout () {
  return (dispatch, getState, client) => {
    const req = client.del('/auth/sign_out')
    clearData()
    dispatch(logoutAction())
    return req
  }
}

export function login (user) {
  return (dispatch, getState, client) => {
    return authRequest('post', '/api/auth/sign_in', user)
      .then((response) => {
        dispatch(setCurrentUserAction(response.resource))
        dispatch(setAuthDataAction(response.authData))
        setAuthData(response.authData)
      })
  }
}

export function signUp (user) {
  return (dispatch, getState, client) => {
    return authRequest('post', '/api/auth', user)
      .then((response) => {
        dispatch(setCurrentUserAction(response.resource))
        dispatch(setAuthDataAction(response.authData))
        setAuthData(response.authData)
      })
  }
}

export function loadCurrentUser (authData) {
  const data = authData || getAuthData()
  return (dispatch, getState, client) => {
    return authRequest('get', '/api/auth/validate_token', data)
      .then((response) => {
        dispatch(setCurrentUserAction(response.resource))
        if (authData) {
          dispatch(setAuthDataAction(response.authData))
          setAuthData(response.authData)
        }
      })
      .catch((response) => dispatch(push('/login')))
  }
}

export function recoveryPassword (data) {
  data.redirect_url = window.location.origin + '/reset-password'
  return (dispatch, getState, client) => {
    return client.post('/auth/password', {data})
  }
}

export function resetPassword (data) {
  return (dispatch, getState, client) => {
    return client.put('/auth', {data})
  }
}

export function oAuthActions (provider, anonymous_campaign_id, cart_id) {
  return (dispatch, getState, client) => {
    return oAuthRequest(provider, anonymous_campaign_id, cart_id)
      .then((response) => {
        dispatch(setCurrentUserAction(response.resource))
        dispatch(setAuthDataAction(response.authData))
        setAuthData(response.authData)
        dispatch(loadCurrentUser())
      })
      .catch((error) => {
        throw (error)
      })
  }
}

export function mailAuthActions (service, user_id) {
  return (dispatch, getState, client) => {
    return mailAuthRequest(service, user_id)
      .then(() => {
        dispatch(loadCurrentUser())
      })
      .catch((error) => {
        throw (error)
      })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_AUTH_DATA]: (state, action) => ({
    ...state,
    data: action.payload
  }),
  [SET_CURRENT_USER]: (state, action) => ({
    ...state,
    user: action.payload
  }),
  [UPDATE_CURRENT_USER]: (state, action) => ({
    ...state,
    user: {
      ...state.user,
      ...action.payload
    }
  }),
  [LOGOUT]: (state, action) => ({
    data: null, user: null
  })
}, initialState)
