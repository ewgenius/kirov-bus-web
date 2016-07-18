import {handleActions, Action} from 'redux-actions'

export type RoutesState = {
  loading: boolean
  routes: Array<number>
  route: any
}

const routesState: RoutesState = {
  loading: false,
  routes: [],
  route: null
}

export default handleActions<RoutesState, any>({
  ['REQUEST_ROUTES']: (state: RoutesState, action: Action<any>): RoutesState => {
    return state
  }
}, routesState)
