import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_LOADING = 'templates/SET_LOADING'
const SET_TEMPLATES_DATA = 'templates/SET_TEMPLATES_DATA'
const SET_TEMPLATE_DATA = 'templates/SET_TEMPLATE_DATA'

const initialState = {
  data: [],
  resource: {},
  loading: false
}

// ------------------------------------
// Actions
// ------------------------------------
export const setTemplatesData = createAction(SET_TEMPLATES_DATA)
export const setTemplateData = createAction(SET_TEMPLATE_DATA)
export const setLoading = createAction(SET_LOADING)

// ------------------------------------
// Action creators
// ------------------------------------
export function getTemplates (params) {
  return (dispatch, getState, client) => {
    dispatch(setLoading(true))
    return client.get('popup_templates', {params: params})
      .then((response) => {
        dispatch(setTemplatesData(response.resources))
        dispatch(setLoading(false))
      })
      .catch((response) => dispatch(setLoading(false)))
  }
}

export function getTemplate (id) {
  return (dispatch, getState, client) => {
    return client.get(`popup_templates/${id}`)
      .then((response) => {
        dispatch(setTemplateData(response.resource))
        return response.resource
      })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_TEMPLATES_DATA]: (state, action) => ({
    ...state,
    data: action.payload
  }),
  [SET_TEMPLATE_DATA]: (state, action) => ({
    ...state,
    resource: action.payload
  }),
  [SET_LOADING]: (state, action) => ({
    ...state,
    loading: action.payload
  })
}, initialState)
