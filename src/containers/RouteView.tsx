import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {goBack} from 'react-router-redux'

import {State} from '../configureStore'

// actions
import {requestRoute} from '../actions/routes'

// components
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import MapView from '../components/MapView/MapView'

//icons
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

interface RoutesProps {
  loading: boolean
  route: any

  dispatch: any
  params: {
    route: string
  }
}

class RouteView extends Component<any, any> {
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
    return <div className='route view'>
      <AppBar
        title='Маршрут'
        titleStyle={{
          fontSize: 20
        }}
        iconElementLeft={
          <IconButton onTouchTap={() => this.props.dispatch(goBack()) }>
            <NavigationArrowBack/>
          </IconButton>
        }/>

      <div className='content'>
        <MapView route={this.props.route}/>
      </div>
    </div>
  }
}
export default connect((state: State) => {
  return {
    loading: state.routes.loadingRoute,
    route: state.routes.route
  }
})(RouteView)
