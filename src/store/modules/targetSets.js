import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_LOADING = 'targetSets/SET_LOADING'
const SET_TARGET_SET_DATA = 'targetSets/SET_TARGET_SET_DATA'

const initialState = {
  data: [],
  loading: false
}

// ------------------------------------
// Actions
// ------------------------------------
export const setTemplatesData = createAction(SET_TARGET_SET_DATA)
export const setLoading = createAction(SET_LOADING)

// ------------------------------------
// Action creators
// ------------------------------------
export function getTargetSets (campaign_id, popup_id, id) {
  return (dispatch, getState, client) => {
    dispatch(setLoading(true))
    return client.get(`campaigns/${campaign_id}/popups/${popup_id}/target_sets/${id}`)
      .then((response) => {
        dispatch(setTemplatesData(response.resources))
        dispatch(setLoading(false))
      })
      .catch((response) => dispatch(setLoading(false)))
  }
}

export function saveTargetSets (campaign_id, popup_id) {
  return (dispatch, getState, client) => {
    dispatch(setLoading(true))
    return client.post(`campaigns/${campaign_id}/popups/${popup_id}/target_sets}`)
      .then((response) => {
        dispatch(setTemplatesData(response.resource))
        dispatch(setLoading(false))
      })
      .catch((response) => dispatch(setLoading(false)))
  }
}

export function updateTargetSets (campaign_id, popup_id, data) {
  return (dispatch, getState, client) => {
    dispatch(setLoading(true))
    return client.post(`campaigns/${campaign_id}/popups/${popup_id}/target_sets}`, {data: {resource: data}})
      .then((response) => {
        dispatch(setTemplatesData(response.resource))
        dispatch(setLoading(false))
      })
      .catch((response) => dispatch(setLoading(false)))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_TARGET_SET_DATA]: (state, action) => ({
    ...state,
    data: action.payload
  }),
  [SET_LOADING]: (state, action) => ({
    ...state,
    loading: action.payload
  })
}, initialState)
