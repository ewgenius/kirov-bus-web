import * as React from 'react'
import {Component, PropTypes} from 'react'
require('../../../src/components/AppShell/AppShell.scss')

// components
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import CircularProgress from 'material-ui/CircularProgress'
import Sidebar from '../Sidebar/Sidebar'

//icons
import DirectionsBus from 'material-ui/svg-icons/maps/directions-bus'
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import ActionTimeline from 'material-ui/svg-icons/action/timeline'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'

export default class AppShell extends Component<{
  sidebarOpen: boolean
  onSidebarOpen: (open: boolean) => void
}, any> {
  componentDidMount() {
  }

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
