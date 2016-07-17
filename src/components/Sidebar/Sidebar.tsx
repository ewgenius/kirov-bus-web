import * as React from 'react'
import {Component, PropTypes} from 'react'

// components
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

//icons
import ActionTimeline from 'material-ui/svg-icons/action/timeline'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'

export default class Sidebar extends Component<{
  sidebarOpen: boolean
  onSidebarOpen: (open: boolean) => void
}, any> {
  render() {
    return <Drawer
      open={this.props.sidebarOpen}
      docked={false}
      onRequestChange={this.props.onSidebarOpen}>
      <AppBar showMenuIconButton={false} title='Где автобус?'/>

      <MenuItem leftIcon={<ActionTimeline />} primaryText='Маршруты'/>
      <MenuItem leftIcon={<ActionFavorite />} primaryText='Избранные маршруты'/>
      <MenuItem leftIcon={<ActionSettings />} primaryText='Настройки'/>
      <Divider />
      <MenuItem primaryText='О приложении'/>
    </Drawer>
  }
}
