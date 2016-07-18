import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

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
      <Sidebar
        sidebarOpen={this.props.sidebarOpen}
        onSidebarOpen={open => this.props.dispatch({
          type: open ? 'SIDEBAR_OPEN' : 'SIDEBAR_CLOSE'
        })}
        onMenuSelect={path => this.props.dispatch(push(path))}
        />

      {this.props.children}
    </div>
  }
}
