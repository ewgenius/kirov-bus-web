import {handleActions, Action} from 'redux-actions'
import {
  REQUEST_ROUTES,
  RECEIVE_ROUTES,
  SELECT_ROUTE
} from '../actions/routes'
import {set, lensProp} from 'ramda'

export type RoutesState = {
  loading: boolean
  routes: Array<number>
  route: any
}

const lensLoading = lensProp('loading')
const lensRoutes = lensProp('routes')
const lensRoute = lensProp('route')

const routesState: RoutesState = {
  loading: false,
  routes: [],
  route: null
}

export default handleActions<RoutesState, any>({
  [REQUEST_ROUTES]: (state: RoutesState, action: Action<any>): RoutesState => {
    return set(lensLoading, true, state)
  },
  [RECEIVE_ROUTES]: (state: RoutesState, action: Action<any>): RoutesState => {
    return set(lensLoading, false,
      set(lensRoutes, action.payload, state))
  },
  [SELECT_ROUTE]: (state: RoutesState, action: Action<any>): RoutesState => {
    return set(lensRoute, action.payload, state)
  }
}, routesState)
