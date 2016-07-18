import * as React from 'react'
import {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route, Redirect, hashHistory} from 'react-router'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import {MuiThemeProvider} from 'material-ui/styles'

import configureStore from '../configureStore'

import theme from '../styles/theme'
import AppView from '../components/AppView/AppView'
import MapView from '../components/MapView/MapView'
import Shell from './Shell'
import RoutesView from './RoutesView'

require('../../src/styles/main.scss')
injectTapEventPlugin()

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

const Dummy = () => <div>dummy</div>

export default class App extends Component<any, any> {
  render() {
    return <Provider store={store}>
      <MuiThemeProvider muiTheme={theme}>
        <Router history={history}>
          <Redirect from='/' to='/routes'/>
          <Route path='/' component={Shell}>
            <Route path='/routes' component={RoutesView}/>
            <Route path='/favorite' component={Dummy}/>
            <Route path='/settings' component={Dummy}/>
            <Route path='/about' component={Dummy}/>
          </Route>
        </Router>
      </MuiThemeProvider>
    </Provider>
  }
}
