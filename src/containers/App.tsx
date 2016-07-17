import * as React from 'react'
import {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import configureStore from '../configureStore'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import {MuiThemeProvider} from 'material-ui/styles'

import theme from '../styles/theme'
import AppView from '../components/AppView/AppView'

require('../../src/styles/main.scss')
injectTapEventPlugin()

const store = configureStore()

export default class App extends Component<any, any> {
  render() {
    return <Provider store={store}>
      <MuiThemeProvider muiTheme={theme}>
        <AppView />
      </MuiThemeProvider>
    </Provider>
  }
}
