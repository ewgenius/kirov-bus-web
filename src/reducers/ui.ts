import {set, lensPath, lensProp} from 'ramda'
import {handleActions, Action} from 'redux-actions'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  SIDEBAR_TOGGLE
} from '../actions/ui'

export type UiState = {
  sidebarOpen: boolean
}

const lensSidebar = lensProp('sidebarOpen')

const uiState: UiState = {
  sidebarOpen: false
}

export default handleActions<UiState, any>({
  [SIDEBAR_OPEN]: (state: UiState, action: Action<any>): UiState => {
    return set(lensSidebar, true, state)
  },
  [SIDEBAR_CLOSE]: (state: UiState, action: Action<any>): UiState => {
    return set(lensSidebar, false, state)
  },
  [SIDEBAR_TOGGLE]: (state: UiState, action: Action<any>): UiState => {
    return set(lensSidebar, !state.sidebarOpen, state)
  }
}, uiState)
