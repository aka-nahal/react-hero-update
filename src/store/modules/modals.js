import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SHOW_MODAL = 'modals/SHOW_MODAL'
const HIDE_MODAL = 'modals/HIDE_MODAL'

const initialState = {}

// ------------------------------------
// Actions
// ------------------------------------
export const showModal = createAction(SHOW_MODAL,
  (modalName, data) => ({modalName, data})
)
export const hideModal = createAction(HIDE_MODAL,
  (modalName, data) => ({modalName, data})
)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SHOW_MODAL]: (state, action) => ({
    [action.payload.modalName]: true,
    data: action.payload.data
  }),
  [HIDE_MODAL]: (state, action) => ({
    [action.payload.modalName]: false,
    data: action.payload.data
  })
}, initialState)
