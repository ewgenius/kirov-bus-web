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
  onMenuSelect: (path: string) => void
}, any> {
  render() {
    return <Drawer
      open={this.props.sidebarOpen}
      docked={false}
      onRequestChange={this.props.onSidebarOpen}>
      <AppBar showMenuIconButton={false} title='Где автобус?'/>

      <MenuItem onTouchTap={() => this.props.onMenuSelect('/routes')} leftIcon={<ActionTimeline />} primaryText='Маршруты'/>
      <MenuItem onTouchTap={() => this.props.onMenuSelect('/routes/favorite')} leftIcon={<ActionFavorite />} primaryText='Избранные маршруты'/>
      <MenuItem onTouchTap={() => this.props.onMenuSelect('/settings')} leftIcon={<ActionSettings />} primaryText='Настройки'/>
      <Divider />
      <MenuItem onTouchTap={() => this.props.onMenuSelect('/about')} primaryText='О приложении'/>
    </Drawer>
  }
}
