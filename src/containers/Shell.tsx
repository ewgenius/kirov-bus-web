import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {State} from '../configureStore'

// actions
import {sidebarOpen, sidebarClose} from '../actions/ui'

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
    const {dispatch} = this.props

    return <div className='shell view'>
      <Sidebar
        sidebarOpen={this.props.sidebarOpen}
        onSidebarOpen={open => dispatch(open ? sidebarOpen() : sidebarClose())}
        onMenuSelect={path => {
          dispatch(push(path))
          dispatch(sidebarClose())
        }}
        />

      {this.props.children}
    </div>
  }
}
