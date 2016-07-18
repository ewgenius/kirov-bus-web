import * as React from 'react'
import {Component, PropTypes} from 'react'
require('../../../src/components/Sidebar/Sidebar.scss')

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
  docked?: boolean
  onSidebarOpen: (open: boolean) => void
  onMenuSelect: (path: string) => void
}, any> {
  static defaultProps = {
    docked: false
  }

  render() {
    return <Drawer
      className='sidebar'
      open={this.props.sidebarOpen}
      docked={this.props.docked}
      width={300}
      onRequestChange={this.props.onSidebarOpen}>
        <AppBar
          showMenuIconButton={false}
          title='Где автобус?'
          titleStyle={{
            fontSize: 20
          }}
          />

        <MenuItem className='menu-item' onTouchTap={() => this.props.onMenuSelect('/routes')} leftIcon={<ActionTimeline />} primaryText='Маршруты'/>
        <MenuItem className='menu-item' onTouchTap={() => this.props.onMenuSelect('/routes/favorite')} leftIcon={<ActionFavorite />} primaryText='Избранные маршруты'/>
        <MenuItem className='menu-item' onTouchTap={() => this.props.onMenuSelect('/settings')} leftIcon={<ActionSettings />} primaryText='Настройки'/>
        <Divider />
        <MenuItem className='menu-item' onTouchTap={() => this.props.onMenuSelect('/about')} primaryText='О приложении'/>
      </Drawer>
  }
}
