import * as React from 'react'
import {Component, PropTypes} from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import {MuiThemeProvider, getMuiTheme, lightBaseTheme} from 'material-ui/styles'

import AppView from '../components/AppView/AppView'

require('../../src/styles/main.scss')
injectTapEventPlugin()

interface Palette {
  colorPrimary: string
  colorAccent: string
}
const palette: Palette = require('!!sass-variable-loader!../../src/styles/_palette.scss')

const theme = getMuiTheme({
  palette: {
    primary1Color: palette.colorPrimary,
    primary2Color: palette.colorPrimary,
    primary3Color: palette.colorPrimary,
    accent1Color: palette.colorAccent,
    accent2Color: palette.colorAccent,
    accent3Color: palette.colorAccent,
  },
  appBar: {
    height: 50,
  }
})

//const store = create

export default class App extends Component<any, any> {
  render() {
    return <MuiThemeProvider muiTheme={theme}>
      <AppView />
    </MuiThemeProvider>
  }
}
