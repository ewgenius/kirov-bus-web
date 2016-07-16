import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
require('../../../src/components/AppView/AppView.scss')

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

const API_HOST = location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://kirov-bus.herokuapp.com'

const mapStateToProps = state => {
  return {
    sidebarOpen: state.ui.sidebarOpen
  }
}

class AppView extends Component<{
  sidebarOpen: boolean
  dispatch: Function
}, any> {
  state = {
    routes: [],
    loading: false
  }

  componentDidMount() {
    this.load()
  }

  load() {
    this.setState({
      loading: true
    })
    fetch(`${API_HOST}/api/v1/routes?limit=100`)
      .then(r => r.json())
      .then(routes => {
        this.setState({
          routes: routes.sort((a, b) => a.route - b.route),
          loading: false
        })
      })
  }

  openSidebar(open = true) {
    this.props.dispatch({
      type: open ? 'SIDEBAR_OPEN' : 'SIDEBAR_CLOSE'
    })
  }

  render() {
    const {routes, loading} = this.state

    return <div className='app-view view'>
      <AppBar
        title='Выберите маршрут'
        iconElementLeft={<IconButton onTouchTap={() => this.openSidebar()}><NavigationMenu/></IconButton>}
        iconElementRight={<IconButton onTouchTap={() => this.load()}><NavigationRefresh/></IconButton>}
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
        {loading ? <CircularProgress style={{
          display: 'block',
          margin: '10% auto'
        }} /> : <List>
          {
            routes.map((route, i) => {
              return <ListItem
                key={i}
                primaryText={`Маршрут ${route.routeNumber}`}
                leftIcon={<DirectionsBus />}/>
            })
          }
        </List>}
      </div>
    </div>
  }
}

export default connect(mapStateToProps)(AppView)
