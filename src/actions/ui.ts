import {createAction} from 'redux-actions'

export const SIDEBAR_OPEN = 'SIDEBAR_OPEN'
export const SIDEBAR_CLOSE = 'SIDEBAR_CLOSE'
export const SIDEBAR_TOGGLE = 'SIDEBAR_TOGGLE'

export const sidebarOpen = createAction(SIDEBAR_OPEN)
export const sidebarClose = createAction(SIDEBAR_CLOSE)
export const sidebarToggle = createAction(SIDEBAR_TOGGLE)
