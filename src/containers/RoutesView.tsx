import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {State} from '../configureStore'
import {Route} from '../models/Route'

// actions
import {
  requestRoutes,
  receiveRoutes,
  requestRoute
} from '../actions/routes'

// components
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import RoutesList from '../components/RoutesList/RoutesList'

//icons
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

interface RoutesProps {
  loading: boolean
  routes: Array<any>
  route: any
  dispatch: any
}

class RoutesView extends Component<RoutesProps, any> {
  componentDidMount() {
    if (!this.props.routes || this.props.routes.length === 0)
      this.props.dispatch(requestRoutes())
  }

  selectRoute(route: Route) {
    this.props.dispatch(requestRoute(route.route))
    this.props.dispatch(push(`/routes/route/${route.route}`))
  }

  render() {
    const {loading, routes, route, dispatch} = this.props

    return <div className='routes view'>
      <AppBar
        title='Выберите маршрут'
        titleStyle={{
          fontSize: 20
        }}
        iconElementLeft={<IconButton onTouchTap={() => this.props.dispatch({
          type: 'SIDEBAR_OPEN'
        }) }><NavigationMenu/></IconButton>}
        iconElementRight={<IconButton onTouchTap={() => { } }><NavigationRefresh/></IconButton>}
        />

      <div className='content'>
        <RoutesList
          loading={loading}
          routes={routes}
          favorites={[]}
          selectRoute={route => this.selectRoute(route) }
          setFavorite={() => { } }
          />
      </div>
    </div>
  }
}

export default connect((state: State) => {
  return {
    loading: state.routes.loading,
    routes: state.routes.routes,
    route: state.routes.route,
  }
})(RoutesView)