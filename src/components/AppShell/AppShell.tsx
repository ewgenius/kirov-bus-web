import * as React from 'react'
import {Component, PropTypes} from 'react'
require('../../../src/components/AppShell/AppShell.scss')

// components
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import {List, ListItem} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import CircularProgress from 'material-ui/CircularProgress'

//icons
import DirectionsBus from 'material-ui/svg-icons/maps/directions-bus'
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'


export default class AppShell extends Component<{
  sidebarOpen: boolean
}, any> {
  componentDidMount() {
  }


  openSidebar(open = true) {
  }

  render() {
    return <div className='app-shell view'>
      <AppBar
        title='Выберите маршрут'
        iconElementLeft={<IconButton onTouchTap={() => this.openSidebar()}><NavigationMenu/></IconButton>}
        iconElementRight={<IconButton onTouchTap={() => {}}><NavigationRefresh/></IconButton>}
        />
      <Drawer
        open={this.props.sidebarOpen}
        docked={false}
        onRequestChange={open => {
          console.log(open)
          this.openSidebar(open)
        }}>
        <AppBar showMenuIconButton={false} title='Где автобус?'/>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
        <MenuItem>test menu</MenuItem>
      </Drawer>

      <div className='content'>
        content
      </div>
    </div>
  }
}
