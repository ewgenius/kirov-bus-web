import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {goBack} from 'react-router-redux'

import {State} from '../configureStore'

// components
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import MapView from '../components/MapView/MapView'

//icons
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

@connect()
export default class RouteView extends Component<any, any> {
  render() {
    return <div className='route view'>
      <AppBar
        title='Маршрут'
        iconElementLeft={
          <IconButton onTouchTap={() => this.props.dispatch(goBack())}>
            <NavigationArrowBack/>
          </IconButton>
        }/>

      <div className='content'>
        <MapView />
        <div>test</div>
      </div>
    </div>
  }
}
