import * as React from 'react'
import {Component, PropTypes} from 'react'
require('../../../src/components/AppView/AppView.scss')

// components
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import {List, ListItem} from 'material-ui/List'

//icons
import DirectionsBus from 'material-ui/svg-icons/maps/directions-bus'

export default class AppView extends Component<any, any> {
  state = {
    routes: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
    ]
  }

  render() {
    const {routes} = this.state

    return <div className='app-view view'>
      <AppBar title='Выберите маршрут'/>
      <Drawer open={false}/>

      <div className='content'>
        <List>
          {
            routes.map((route, i) => {

              return <ListItem
                key={i}
                primaryText={`Маршрут ${route}`}
                leftIcon={<DirectionsBus />}/>
            })
          }
        </List>
      </div>
    </div>
  }
}
