import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {State} from '../configureStore'

// components
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Sidebar from '../components/Sidebar/Sidebar'

//icons
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

interface ShellProps {
  sidebarOpen: boolean
}

@connect((state: State): ShellProps => {
  return {
    sidebarOpen: state.ui.sidebarOpen
  }
})
export default class Shell extends Component<any, any> {
  render() {
    return <div className='shell view'>
      <AppBar
        title='Выберите маршрут'
        iconElementLeft={<IconButton onTouchTap={() => this.props.dispatch({
          type: 'SIDEBAR_OPEN'
        })}><NavigationMenu/></IconButton>}
        iconElementRight={<IconButton onTouchTap={() => {}}><NavigationRefresh/></IconButton>}
        />

      <Sidebar
        sidebarOpen={this.props.sidebarOpen}
        onSidebarOpen={open => this.props.dispatch({
          type: open ? 'SIDEBAR_OPEN' : 'SIDEBAR_CLOSE'
        })}
        />

      <div className='content'>
        {this.props.children}
      </div>
    </div>
  }
}
