import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_POPUP_IMAGE = 'popups/SET_POPUP_IMAGE'
const SET_RESOURCES_LOADING = 'popups/SET_RESOURCES_LOADING'
const SET_RESOURCE_LOADING = 'popups/SET_RESOURCE_LOADING'
const SET_POPUPS_DATA = 'popups/SET_POPUPS_DATA'
const SET_POPUP_DATA = 'popups/SET_CAMPAIGN_DATA'

const initialState = {
  resources: {
    data: [],
    loading: false
  },
  resource: {
    data: {},
    loading: false
  },
  images: []
}

// ------------------------------------
// Actions
// ------------------------------------
export const setPopupsData = createAction(SET_POPUPS_DATA)
export const setPopupImage = createAction(SET_POPUP_IMAGE)
export const setResourcesLoading = createAction(SET_RESOURCES_LOADING)
export const setPopupData = createAction(SET_POPUP_DATA)
export const setResourceLoading = createAction(SET_RESOURCE_LOADING)

// ------------------------------------
// Action creators
// ------------------------------------
export function getPopups (params, campaign_id) {
  return (dispatch, getState, client) => {
    dispatch(setResourcesLoading(true))
    return client.get(`campaigns/${campaign_id}/popups/`, {params: params})
      .then((response) => {
        dispatch(setPopupsData(response.resources))
        dispatch(setResourcesLoading(false))
      })
      .catch((response) => dispatch(setResourcesLoading(false)))
  }
}

export function createPopup (data) {
  return (dispatch, getState, client) => {
    dispatch(setResourceLoading(true))
    return client.post('popups', {data: {resource: data}})
      .then((response) => {
        dispatch(setPopupData(response.resource))
        dispatch(setResourceLoading(false))
        return response
      })
      .catch((response) => dispatch(setResourceLoading(false)))
  }
}

export function getPopup (campaign_id, id) {
  return (dispatch, getState, client) => {
    dispatch(setResourceLoading(true))
    return client.get(`campaigns/${campaign_id}/popups/${id}`)
      .then((response) => {
        dispatch(setPopupData(response.resource))
        dispatch(setResourceLoading(false))
        return response.resource
      })
      .catch((response) => dispatch(setResourceLoading(false)))
  }
}

export function updatePopup (campaign_id, id, data) {
  return (dispatch, getState, client) => {
    dispatch(setResourceLoading(true))
    return client.put(`campaigns/${campaign_id}/popups/${id}`, {data: {resource: data}})
      .then((response) => {
        dispatch(setPopupData(response.resource))
        dispatch(setResourceLoading(false))
        return response.resource
      })
      .catch((response) => dispatch(setResourceLoading(false)))
  }
}

export function removePopup (campaign_id, id) {
  return (dispatch, getState, client) => {
    dispatch(setResourceLoading(true))
    return client.put(`campaigns/${campaign_id}/popups/${id}`)
      .then((response) => {
        dispatch(setPopupData(response.resource))
        dispatch(setResourceLoading(false))
      })
      .catch((response) => dispatch(setResourceLoading(false)))
  }
}

export function uploadPopupImage (data) {
  return (dispatch, getState, client) => {
    return client.post('popup_images', {data: data})
      .then((response) => {
        dispatch(setPopupImage(response.resource))
        return response
      })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_POPUPS_DATA]: (state, action) => ({
    ...state,
    resources: { data: action.payload, loading: state.resources.loading }
  }),
  [SET_POPUP_DATA]: (state, action) => ({
    ...state,
    resource: { data: action.payload, loading: state.resource.loading }
  }),
  [SET_POPUP_IMAGE]: (state, action) => ({
    ...state,
    images: state.images.concat(action.payload)
  }),
  [SET_RESOURCES_LOADING]: (state, action) => ({
    ...state,
    resources: { data: state.resources.data, loading: action.payload }
  }),
  [SET_RESOURCE_LOADING]: (state, action) => ({
    ...state,
    resource: { data: state.resource.data, loading: action.payload }
  })
}, initialState)
