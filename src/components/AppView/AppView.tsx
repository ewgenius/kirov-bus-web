import * as React from 'react'
import {Component, PropTypes} from 'react'
require('../../../src/components/AppView/AppView.scss')

// components
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import {List, ListItem} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import CircularProgress from 'material-ui/CircularProgress'

//icons
import DirectionsBus from 'material-ui/svg-icons/maps/directions-bus'
import Refresh from 'material-ui/svg-icons/navigation/refresh'

const API_HOST = location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://kirov-bus.herokuapp.com'

export default class AppView extends Component<any, any> {
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

  render() {
    const {routes, loading} = this.state

    return <div className='app-view view'>
      <AppBar
        title='Выберите маршрут'
        iconElementRight={<IconButton onTouchTap={() => this.load()}><Refresh/></IconButton>}
        />
      <Drawer open={false}/>

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
