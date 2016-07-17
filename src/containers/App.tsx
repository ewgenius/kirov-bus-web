import * as React from 'react'
import {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import {Router, Route, hashHistory} from 'react-router'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import {MuiThemeProvider} from 'material-ui/styles'

import configureStore from '../configureStore'

import theme from '../styles/theme'
import AppView from '../components/AppView/AppView'
import Shell from './Shell'

require('../../src/styles/main.scss')
injectTapEventPlugin()

const store = configureStore()

export default class App extends Component<any, any> {
  render() {
    return <Provider store={store}>
      <MuiThemeProvider muiTheme={theme}>
        <Router history={hashHistory}>
          <Route path='/' component={Shell}>
          </Route>
        </Router>
      </MuiThemeProvider>
    </Provider>
  }
}
