import * as React from 'react'
import {Component, PropTypes} from 'react'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import {MuiThemeProvider, getMuiTheme, lightBaseTheme} from 'material-ui/styles'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'

require('../../../src/styles/main.scss')
injectTapEventPlugin()

const theme = getMuiTheme(lightBaseTheme)

export class App extends Component<any, any> {
  render() {
    return <MuiThemeProvider muiTheme={theme}>
      <div className='app'>
        <AppBar title='kirov bus'/>
        <Drawer />
      </div>
    </MuiThemeProvider>
  }
}
