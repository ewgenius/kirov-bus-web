import {createAction} from 'redux-actions'

export const SIDEBAR_OPEN = 'SIDEBAR_OPEN'
export const SIDEBAR_CLOSE = 'SIDEBAR_CLOSE'
export const STOPSBAR_OPEN = 'STOPSBAR_OPEN'
export const STOPSAR_CLOSE = 'STOPSAR_CLOSE'

export const sidebarOpen = createAction(SIDEBAR_OPEN)
export const sidebarClose = createAction(SIDEBAR_CLOSE)
export const stopsBarOpen = createAction(STOPSBAR_OPEN)
export const stopsBarClose = createAction(STOPSAR_CLOSE)
