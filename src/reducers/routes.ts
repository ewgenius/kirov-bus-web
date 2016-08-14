import {handleActions, Action} from 'redux-actions'
import {
  REQUEST_ROUTES,
  REQUEST_ROUTE,
  RECEIVE_ROUTES,
  SELECT_ROUTE
} from '../actions/routes.ts'
import {set, lensProp} from 'ramda'

export type RoutesState = {
  loading: boolean
  loadingRoute: boolean
  routes: Array<number>
  route: any
}

const lensLoading = lensProp('loading')
const lensRoutes = lensProp('routes')
const lensRoute = lensProp('route')
const lensLoadingRoute = lensProp('loadingRoute')

const routesState: RoutesState = {
  loading: false,
  loadingRoute: false,
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
  [REQUEST_ROUTE]: (state: RoutesState, action: Action<any>): RoutesState => {
    return set(lensLoadingRoute, true, state)
  },
  [SELECT_ROUTE]: (state: RoutesState, action: Action<any>): RoutesState => {
    return set(lensLoadingRoute, false,
      set(lensRoute, action.payload, state))
  }
}, routesState)
