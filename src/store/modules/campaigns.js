import update from 'react/lib/update'
import _ from 'lodash'
import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_RESOURCES_LOADING = 'campaigns/SET_RESOURCES_LOADING'
const SET_RESOURCE_LOADING = 'campaigns/SET_RESOURCE_LOADING'
const SET_CAMPAIGNS_DATA = 'campaigns/SET_CAMPAIGNS_DATA'
const UPDATE_CAMPAIGNS_DATA = 'campaigns/UPDATE_CAMPAIGNS_DATA'
const SET_CAMPAIGN_DATA = 'campaigns/SET_CAMPAIGN_DATA'
const DELETE_CAMPAIGN_DATA = 'campaigns/DELETE_CAMPAIGN_DATA'

const initialState = {
  resources: {
    data: [],
    loading: false
  },
  resource: {
    data: {},
    loading: false
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const setCampaignsData = createAction(SET_CAMPAIGNS_DATA)
export const deleteCampaignsData = createAction(DELETE_CAMPAIGN_DATA)
export const updateCampaignsData = createAction(UPDATE_CAMPAIGNS_DATA)
export const setResourcesLoading = createAction(SET_RESOURCES_LOADING)
export const setCampaignData = createAction(SET_CAMPAIGN_DATA)
export const setResourceLoading = createAction(SET_RESOURCE_LOADING)

// ------------------------------------
// Action creators
// ------------------------------------
export function getCampaigns (params) {
  return (dispatch, getState, client) => {
    dispatch(setResourcesLoading(true))
    return client.get('campaigns', {params: {sort: params}})
      .then((response) => {
        dispatch(setCampaignsData(response.resources))
        dispatch(setResourcesLoading(false))
        return response.resources
      })
      .catch(() => dispatch(setResourcesLoading(false)))
  }
}

export function saveCampaigns () {
  return (dispatch, getState, client) => {
    dispatch(setResourcesLoading(true))
    return client.post('campaigns')
      .then((response) => {
        dispatch(setCampaignsData(response.resources))
        dispatch(setResourcesLoading(false))
      })
      .catch(() => dispatch(setResourcesLoading(false)))
  }
}

export function getCampaign (id) {
  return (dispatch, getState, client) => {
    dispatch(setResourceLoading(true))
    return client.get(`campaigns/${id}`)
      .then((response) => {
        dispatch(setCampaignData(response.resource))
        dispatch(setResourceLoading(false))
        return response.resource
      })
      .catch((response) => dispatch(setResourceLoading(false)))
  }
}

export function updateCampaign (campaign_id, data) {
  return (dispatch, getState, client) => {
    dispatch(setResourceLoading(true))
    return client.put(`campaigns/${campaign_id}`, {data: {resource: data}})
      .then((response) => {
        dispatch(updateCampaignsData(response.resource))
        dispatch(setResourceLoading(false))
        return response.resource
      })
      .catch((error) => {
        dispatch(setResourceLoading(false))
        throw error
      })
  }
}

export function removeCampaign (campaign_id) {
  return (dispatch, getState, client) => {
    dispatch(setResourceLoading(true))
    return client.del(`campaigns/${campaign_id}`)
      .then(() => {
        dispatch(deleteCampaignsData({id: campaign_id}))
        dispatch(setResourceLoading(false))
      })
      .catch(() => dispatch(setResourceLoading(false)))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_CAMPAIGNS_DATA]: (state, action) => ({
    ...state,
    resources: { data: action.payload, loading: state.resources.loading }
  }),
  [SET_CAMPAIGN_DATA]: (state, action) => ({
    ...state,
    resource: { data: action.payload, loading: state.resource.loading }
  }),
  [UPDATE_CAMPAIGNS_DATA]: (state, action) => {
    const updatedCampaign = _.find(state.resources.data, {id: action.payload.id})
    return update(state, {
      resources: {
        data: { [state.resources.data.indexOf(updatedCampaign)]: { $set: action.payload } }
      },
      resource: {
        data: { $set: action.payload }
      }
    })
  },
  [DELETE_CAMPAIGN_DATA]: (state, action) => {
    const deletedCampaign = _.find(state.resources.data, {id: action.payload.id})
    return update(state, {
      resources: {
        data: { $splice: [[state.resources.data.indexOf(deletedCampaign), 1]] }
      }
    })
  },
  [SET_RESOURCES_LOADING]: (state, action) => ({
    ...state,
    resources: { data: state.resources.data, loading: action.payload }
  }),
  [SET_RESOURCE_LOADING]: (state, action) => ({
    ...state,
    resource: { data: state.resource.data, loading: action.payload }
  })
}, initialState)
