import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {goBack} from 'react-router-redux'

import {State} from '../configureStore'
import {Route} from '../models/Route'
import {Stop} from '../models/Stop'

// actions
import {requestRoute} from '../actions/routes'
import {stopsBarOpen, stopsBarClose} from '../actions/ui'

// components
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import MapView from '../components/MapView/MapView'
import StopsList from '../components/StopsList/StopsList'

//icons
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import DirectionsBus from 'material-ui/svg-icons/maps/directions-bus'

interface RoutesProps {
  showStopsBar: boolean
  loading: boolean
  route: any

  dispatch: any
  params: {
    route: string
  }
}

class RouteView extends Component<any, any> {
  state = {
    center: null
  }

  componentDidMount() {
    if (
      !this.props.route ||
      this.props.route.route !== this.props.params.route
    ) {
      this.props.dispatch(requestRoute(this.props.params.route))
    }
  }

  componentWillReceiveProps(nextProps: RoutesProps) {
    if (this.props.params.route !== nextProps.params.route) {
      this.props.dispatch(requestRoute(nextProps.params.route))
    }
  }

  render() {
    const route: Route = this.props.route

    return <div className='route view'>
      <AppBar
        title={`Маршрут ${route ? route.routeNumber : ''}`}
        titleStyle={{
          fontSize: 20
        }}
        iconElementLeft={
          <IconButton onTouchTap={() => this.props.dispatch(goBack()) }>
            <NavigationArrowBack/>
          </IconButton>
        }
        iconElementRight={
          <IconButton onTouchTap={() => this.props.dispatch(stopsBarOpen()) }>
            <DirectionsBus/>
          </IconButton>
        }
        />

      <div className='content'>
        <MapView
          route={this.props.route}
          center={this.state.center}
          />

        <Drawer
          open={this.props.showStopsBar}
          openSecondary={true}
          docked={false}
          width={300}
          onRequestChange={open => this.props.dispatch(open ? stopsBarOpen() : stopsBarClose()) }>
          {this.props.route ? <StopsList
            stops={this.props.route.stops}
            selectStop={(stop: Stop) => {
              this.setState({
                center: stop.location
              })
              this.props.dispatch(stopsBarClose())
            } }
            /> : null }
        </Drawer>
      </div>
    </div>
  }
}
export default connect((state: State) => {
  return {
    loading: state.routes.loadingRoute,
    route: state.routes.route,
    showStopsBar: state.ui.stopsBarOpen
  }
})(RouteView)
