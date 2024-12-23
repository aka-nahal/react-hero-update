import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_RESOURCE_LOADING = 'stats/SET_RESOURCE_LOADING'
const SET_STATS_DATA = 'stats/SET_STATS_DATA'

const initialState = {
  chart: {
    data: {},
    loading: false
  },
  campaign: {
    data: {},
    loading: false
  },
  summary: {
    data: {},
    loading: false
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const setStatsData = createAction(SET_STATS_DATA)
export const setResourceLoading = createAction(SET_RESOURCE_LOADING)

// ------------------------------------
// Action creators
// ------------------------------------
export function getChartStats (params) {
  return (dispatch, getState, client) => {
    dispatch(setResourceLoading({value: true, type: 'chart'}))
    return client.get('stats', {params: params})
      .then((response) => {
        dispatch(setStatsData({resource: response, type: 'chart'}))
        dispatch(setResourceLoading({value: false, type: 'chart'}))
        return response
      })
      .catch(() => dispatch(setResourceLoading({value: false, type: 'chart'})))
  }
}

export function getCampaignStats (campaign_id, params) {
  return (dispatch, getState, client) => {
    dispatch(setResourceLoading({value: true, type: 'campaign'}))
    return client.get(`stats/campaigns/${campaign_id}`, {params: params})
      .then((response) => {
        dispatch(setStatsData({resource: response, type: 'campaign'}))
        dispatch(setResourceLoading({value: false, type: 'campaign'}))
        return response
      })
      .catch((response) => dispatch(setResourceLoading({value: false, type: 'campaign'})))
  }
}

export function getSummaryStats () {
  return (dispatch, getState, client) => {
    dispatch(setResourceLoading({value: true, type: 'summary'}))
    return client.get('stats/summary')
      .then((response) => {
        dispatch(setStatsData({resource: response, type: 'summary'}))
        dispatch(setResourceLoading({value: false, type: 'summary'}))
        return response
      })
      .catch((response) => dispatch(setResourceLoading({value: false, type: 'summary'})))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_STATS_DATA]: (state, action) => ({
    ...state,
    [action.payload.type]: { data: action.payload.resource, loading: state[action.payload.type].loading }
  }),
  [SET_RESOURCE_LOADING]: (state, action) => ({
    ...state,
    [action.payload.type]: { data: state[action.payload.type].data, loading: action.payload.value }
  })
}, initialState)
