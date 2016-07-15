import * as React from 'react'
import {Component, PropTypes} from 'react'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import {MuiThemeProvider, getMuiTheme, lightBaseTheme} from 'material-ui/styles'

// components
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import {List, ListItem} from 'material-ui/List'

//icons
import DirectionsBus from 'material-ui/svg-icons/maps/directions-bus'

// config
require('../../../src/styles/main.scss')
injectTapEventPlugin()

const theme = getMuiTheme(lightBaseTheme)

export class App extends Component<any, any> {
  state = {
    routes: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
    ]
  }

  render() {
    const {routes} = this.state

    return <MuiThemeProvider muiTheme={theme}>
      <div className='app view'>
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
    </MuiThemeProvider>
  }
}
