import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import * as createLogger from 'redux-logger'
import {set, lensPath, compose} from 'ramda'

const logger = createLogger()

type IState = {
  ui: {
    sidebarOpen: boolean
  },
  routes: any
}
const initialState: IState = {
  ui: {
    sidebarOpen: false
  },
  routes: {
    loading: false,
    list: []
  }
}

const lensSidebar = lensPath(['ui', 'sidebarOpen'])

export default () => {
  const store = createStore((state: IState = initialState, action) => {
    switch (action.type) {
      case 'SIDEBAR_OPEN': {
        return set(lensSidebar, true, initialState)
      }
      case 'SIDEBAR_CLOSE': {
        return set(lensSidebar, false, initialState)
      }
      case 'SIDEBAR_TOGGLE': {
        return set(lensSidebar, !state.ui.sidebarOpen, initialState)
      }
      default: {
        return state
      }
    }
  }, applyMiddleware(thunk, logger))

  return store
}
