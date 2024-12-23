import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SHOW_SIDEBAR = 'sidebar/SHOW_SIDEBAR'
const HIDE_SIDEBAR = 'sidebar/HIDE_SIDEBAR'
const TOGGLE_SIDEBAR = 'sidebar/TOGGLE_SIDEBAR'
const TOGGLE_SIDEBAR_MOBILE = 'sidebar/TOGGLE_SIDEBAR_MOBILE'
const TOGGLE_TEMPLATES_SIDEBAR = 'sidebar/TOGGLE_TEMPLATES_SIDEBAR'

const initialState = {
  opened: true,
  mobileOpened: false,
  toggled: false,
  templatesSidebar: {
    opened: false,
    toggled: false
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const showSidebar = createAction(SHOW_SIDEBAR)
export const hideSidebar = createAction(HIDE_SIDEBAR)
export const toggleSidebar = createAction(TOGGLE_SIDEBAR)
export const toggleSidebarMobile = createAction(TOGGLE_SIDEBAR_MOBILE)
export const toggleTemplatesSidebar = createAction(TOGGLE_TEMPLATES_SIDEBAR)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SHOW_SIDEBAR]: (state) => ({
    ...state,
    opened: true,
    toggled: true
  }),
  [HIDE_SIDEBAR]: (state) => ({
    ...state,
    opened: false,
    toggled: true
  }),
  [TOGGLE_SIDEBAR]: (state) => ({
    ...state,
    opened: !state.opened,
    toggled: true
  }),
  [TOGGLE_SIDEBAR_MOBILE]: (state) => ({
    ...state,
    mobileOpened: !state.mobileOpened,
    toggled: true
  }),
  [TOGGLE_TEMPLATES_SIDEBAR]: (state) => ({
    ...state,
    templatesSidebar: {
      opened: !state.templatesSidebar.opened,
      toggled: true
    }
  })

}, initialState)
