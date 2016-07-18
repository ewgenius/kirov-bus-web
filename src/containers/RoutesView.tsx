import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {State} from '../configureStore'

// components
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'

//icons
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

interface Props {
}

@connect((state: State): Props => {
  return {

  }
})
export default class RoutesView extends Component<any, any> {
  render() {
    return <div className='routes view'>
      <AppBar
        title='Выберите маршрут'
        iconElementLeft={<IconButton onTouchTap={() => this.props.dispatch({
          type: 'SIDEBAR_OPEN'
        })}><NavigationMenu/></IconButton>}
        iconElementRight={<IconButton onTouchTap={() => {}}><NavigationRefresh/></IconButton>}
        />

      <div className='content'>
        {this.props.children}
      </div>
    </div>
  }
}
