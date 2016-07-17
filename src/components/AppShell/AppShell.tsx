import * as React from 'react'
import {Component, PropTypes} from 'react'
require('../../../src/components/AppShell/AppShell.scss')

// components
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Sidebar from '../Sidebar/Sidebar'

//icons
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

export default class AppShell extends Component<{
  sidebarOpen: boolean
  onSidebarOpen: (open: boolean) => void
}, any> {
  openSidebar(open = true) {
    this.props.onSidebarOpen(open)
  }

  render() {
    return <div className='app-shell view'>
      <AppBar
        title='Выберите маршрут'
        iconElementLeft={<IconButton onTouchTap={() => this.openSidebar()}><NavigationMenu/></IconButton>}
        iconElementRight={<IconButton onTouchTap={() => {}}><NavigationRefresh/></IconButton>}
        />
      <Sidebar sidebarOpen={this.props.sidebarOpen} onSidebarOpen={this.props.onSidebarOpen}/>

      <div className='content'>
        {this.props.children}
      </div>
    </div>
  }
}
