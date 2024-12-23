import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'
import moment from 'moment'

// ------------------------------------
// Constants
// ------------------------------------
const SET_RESOURCES_LOADING = 'leads/SET_RESOURCES_LOADING'
const SET_RESOURCES_DATA = 'leads/SET_RESOURCES_DATA'

const initialState = {
  resources: {
    data: [],
    page: 1,
    perPage: 20,
    total: 0,
    startDate: moment().subtract(1, 'month'),
    endDate: moment(),
    campaignId: '',
    loading: false
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const setResourcesData = createAction(SET_RESOURCES_DATA)
export const setResourcesLoading = createAction(SET_RESOURCES_LOADING)

// ------------------------------------
// Action creators
// ------------------------------------
export function getLeads (params) {
  return (dispatch, getState, client) => {
    dispatch(setResourcesLoading(true))
    return client.get('leads', {params: params})
      .then((response) => {
        dispatch(setResourcesData({
          data: response.resources,
          total: response.meta.total,
          page: params.page,
          startDate: moment(params.start_period),
          endDate: moment(params.end_period),
          campaignId: params.campaign_id,
          perPage: params.per_page
        }))
        dispatch(setResourcesLoading(false))
        return response.resources
      })
      .catch((response) => dispatch(setResourcesLoading(false)))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_RESOURCES_DATA]: (state, action) => ({
    ...state,
    resources: {
      data: action.payload.data,
      loading: state.resources.loading,
      page: action.payload.page,
      perPage: action.payload.perPage,
      total: action.payload.total,
      startDate: state.resources.startDate,
      endDate: action.payload.endDate,
      campaignId: action.payload.campaignId
    }
  }),
  [SET_RESOURCES_LOADING]: (state, action) => {
    const newState = _.clone(state)
    newState.resources.loading = action.payload
    return newState
  }
}, initialState)
