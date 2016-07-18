import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import * as createLogger from 'redux-logger'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import {hashHistory} from 'react-router'

import ui from './reducers/ui'
import {UiState} from './reducers/ui'

const logger = createLogger()

export interface State {
  ui: UiState
}

export default () => {
  const store = createStore(combineReducers({
    ui,
    routing: routerReducer
  }), applyMiddleware(
    thunk,
    logger,
    routerMiddleware(hashHistory)
  ))

  return store
}
