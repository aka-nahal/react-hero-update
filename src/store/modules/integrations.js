import update from 'react/lib/update'
import _ from 'lodash'
import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_RESOURCES_LOADING = 'integrations/SET_RESOURCES_LOADING'
const SET_RESOURCE_LOADING = 'integrations/SET_RESOURCE_LOADING'
const SET_INTEGRATIONS_DATA = 'integrations/SET_INTEGRATIONS_DATA'
const UPDATE_INTEGRATION_DATA = 'integrations/UPDATE_INTEGRATION_DATA'
const SET_INTEGRATION_DATA = 'integrations/SET_INTEGRATION_DATA'
const DELETE_INTEGRATION_DATA = 'integrations/DELETE_INTEGRATION_DATA'

const initialState = {
  resources: {
    page: 1,
    perPage: 10,
    total: 0,
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
export const setIntegrationsData = createAction(SET_INTEGRATIONS_DATA)
export const deleteIntegrationData = createAction(DELETE_INTEGRATION_DATA)
export const updateIntegrationData = createAction(UPDATE_INTEGRATION_DATA)
export const setResourcesLoading = createAction(SET_RESOURCES_LOADING)
export const setIntegrationData = createAction(SET_INTEGRATION_DATA)
export const setResourceLoading = createAction(SET_RESOURCE_LOADING)

// ------------------------------------
// Action creators
// ------------------------------------
export function getIntegrations (params) {
  return (dispatch, getState, client) => {
    dispatch(setResourcesLoading(true))
    return client.get('email_integrations', {params: params})
      .then((response) => {
        dispatch(setIntegrationsData({
          data: response.resources,
          total: response.meta.total,
          page: params.page
        }))
        dispatch(setResourcesLoading(false))
        return response.resources
      })
      .catch(() => dispatch(setResourcesLoading(false)))
  }
}

export function saveIntegration (data) {
  return (dispatch, getState, client) => {
    dispatch(setResourcesLoading(true))
    return client.post(`${_.snakeCase(data.type)}s`, {data: {resource: data}})
      .then((response) => {
        dispatch(setIntegrationData(response.resource))
        dispatch(setResourcesLoading(false))
      })
      .catch((error) => {
        dispatch(setResourcesLoading(false))
        throw error
      })
  }
}

export function getIntegration (id) {
  return (dispatch, getState, client) => {
    dispatch(setResourceLoading(true))
    return client.get(`email_integrations/${id}`)
      .then((response) => {
        dispatch(setIntegrationData(response.resource))
        dispatch(setResourceLoading(false))
        return response.resource
      })
      .catch((response) => dispatch(setResourceLoading(false)))
  }
}

export function updateIntegration (integration_id, data) {
  return (dispatch, getState, client) => {
    dispatch(setResourceLoading(true))
    return client.put(`${_.snakeCase(data.type)}s/${integration_id}`, {data: {resource: data}})
      .then((response) => {
        dispatch(updateIntegrationData(response.resource))
        dispatch(setResourceLoading(false))
        return response.resource
      })
      .catch((error) => {
        dispatch(setResourceLoading(false))
        throw error
      })
  }
}

export function removeIntegration (integration) {
  return (dispatch, getState, client) => {
    dispatch(setResourceLoading(true))
    return client.del(`${_.snakeCase(integration.type)}s/${integration.id}`)
      .then(() => {
        dispatch(deleteIntegrationData({id: integration.id}))
        dispatch(setResourceLoading(false))
      })
      .catch(() => dispatch(setResourceLoading(false)))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_INTEGRATIONS_DATA]: (state, action) => ({
    ...state,
    resources: {
      data: action.payload.data,
      loading: state.resources.loading,
      page: action.payload.page,
      perPage: state.resources.perPage,
      total: action.payload.total
    }
  }),
  [SET_INTEGRATION_DATA]: (state, action) => {
    return update(state, {
      resource: { data: { $set: action.payload } },
      resources: { data: { $push: [action.payload] } }
    })
  },
  [UPDATE_INTEGRATION_DATA]: (state, action) => {
    const updatedIntegration = _.find(state.resources.data, {id: action.payload.id})
    return update(state, {
      resources: {
        data: { [state.resources.data.indexOf(updatedIntegration)]: { $set: action.payload } }
      },
      resource: {
        data: { $set: action.payload }
      }
    })
  },
  [DELETE_INTEGRATION_DATA]: (state, action) => {
    const deletedIntegration = _.find(state.resources.data, {id: action.payload.id})
    return update(state, {
      resources: {
        data: { $splice: [[state.resources.data.indexOf(deletedIntegration), 1]] }
      }
    })
  },
  [SET_RESOURCES_LOADING]: (state, action) => {
    return update(state, {
      resources: {
        loading: { $set: action.payload }
      }
    })
  },
  [SET_RESOURCE_LOADING]: (state, action) => ({
    ...state,
    resource: { data: state.resource.data, loading: action.payload }
  })
}, initialState)
