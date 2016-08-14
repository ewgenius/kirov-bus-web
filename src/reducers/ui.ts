import {set, lensPath, lensProp} from 'ramda'
import {handleActions, Action} from 'redux-actions'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  STOPSBAR_OPEN,
  STOPSAR_CLOSE
} from '../actions/ui.ts'

export type UiState = {
  sidebarOpen: boolean
  stopsBarOpen: boolean
}

const lensSidebar = lensProp('sidebarOpen')
const lensStopsBar = lensProp('stopsBarOpen')


const uiState: UiState = {
  sidebarOpen: false,
  stopsBarOpen: false
}

export default handleActions<UiState, any>({
  [SIDEBAR_OPEN]: (state: UiState, action: Action<any>): UiState => {
    return set(lensSidebar, true, state)
  },
  [SIDEBAR_CLOSE]: (state: UiState, action: Action<any>): UiState => {
    return set(lensSidebar, false, state)
  },
  [STOPSBAR_OPEN]: (state: UiState, action: Action<any>): UiState => {
    return set(lensStopsBar, true, state)
  },
  [STOPSAR_CLOSE]: (state: UiState, action: Action<any>): UiState => {
    return set(lensStopsBar, false, state)
  }
}, uiState)
