import { createAction, handleActions } from 'redux-actions'
import { updateCurrentUser } from 'store/modules/auth'
import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
const SET_PROFILE_DATA = 'profile/SET_PROFILE_DATA'
const SET_LOADING = 'profile/SET_LOADING'

const initialState = {
  data: {},
  loading: false
}

// ------------------------------------
// Actions
// ------------------------------------
const setProfileData = createAction(SET_PROFILE_DATA)
const setLoading = createAction(SET_LOADING)

// ------------------------------------
// Action creators
// ------------------------------------
export function loadProfile (user_id) {
  return (dispatch, getState, client) => {
    dispatch(setLoading(true))
    return client.get(`/users/${user_id}`)
      .then((response) => {
        dispatch(setProfileData(response.resource))
        dispatch(setLoading(false))
      })
      .catch((error) => {
        dispatch(setLoading(false))
        throw error
      })
  }
}

export function updateProfile (user_id, resource) {
  return (dispatch, getState, client) => {
    dispatch(setLoading(true))
    return client.put(`/users/${user_id}`, {data: {resource}}, {headers: true})
      .then((response) => {
        localStorage['uid'] = response.header.uid
        dispatch(setProfileData(response.body.resource))
        dispatch(setLoading(false))
        dispatch(updateCurrentUser(_.pick(response.body.resource,
          ['id', 'email', 'first_name', 'last_name', 'phone', 'full_name']
        )))
      })
      .catch((error) => {
        dispatch(setLoading(false))
        throw error
      })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_PROFILE_DATA]: (state, action) => ({
    ...state,
    data: action.payload
  }),
  [SET_LOADING]: (state, action) => ({
    ...state,
    loading: action.payload
  })
}, initialState)
