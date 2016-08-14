import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import * as promise from 'redux-promise'
import * as createLogger from 'redux-logger'
import api from './middleware/api.ts'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import {hashHistory} from 'react-router'

import ui from './reducers/ui.ts'
import {UiState} from './reducers/ui.ts'
import routes from './reducers/routes.ts'
import {RoutesState} from './reducers/routes.ts'

const logger = createLogger()

export interface State {
  ui: UiState,
  routes: RoutesState,
}

export default () => {
  const store = createStore(combineReducers({
    ui,
    routes,
    routing: routerReducer
  }), applyMiddleware(
    api,
    thunk,
    routerMiddleware(hashHistory)
    //logger
  ))

  return store
}
