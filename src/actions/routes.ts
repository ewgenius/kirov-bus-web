import {CALL_API} from '../middleware/api'
import {createAction} from 'redux-actions'

export const REQUEST_ROUTES = 'REQUEST_ROUTES'
export const RECEIVE_ROUTES = 'RECEIVE_ROUTES'
export const ERROR_ROUTES = 'ERROR_ROUTES'
export const SELECT_ROUTE = 'SELECT_ROUTE'

export const requestRoutes = () => dispatch => {
  dispatch({
    type: REQUEST_ROUTES
  })
  return dispatch({
    [CALL_API]: {
      endpoint: '/api/v1/routes',
      successType: RECEIVE_ROUTES,
      errorType: ERROR_ROUTES
    }
  })
}

export const receiveRoutes = createAction(RECEIVE_ROUTES)

export const selectRoute = createAction(SELECT_ROUTE, route => route)