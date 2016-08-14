import * as React from 'react'
import {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route, Redirect, hashHistory} from 'react-router'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import {MuiThemeProvider} from 'material-ui/styles'
import * as mapboxgl from 'mapbox-gl'
import configureStore from '../configureStore.ts'
import theme from '../styles/theme.ts'

import Shell from './Shell.tsx'
// views
import RoutesView from './RoutesView.tsx'
import RouteView from './RouteView.tsx'
import Settings from './Settings.tsx'
import About from './About.tsx'
import Editor from './Editor.tsx'

import '../styles/main.scss'
injectTapEventPlugin()

const setkey = 'accessToken'
mapboxgl[setkey] = 'pk.eyJ1IjoiZXdnZW5pdXMiLCJhIjoiY2lxZGRleXI1MDA2cWh1bWNsbDF3ODY1YiJ9.IWqlnxi93GGmiBbbDD8aZQ'

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

const Dummy = () => <div>dummy</div>

export default class App extends Component<any, any> {
  render() {
    return <Provider store={store}>
      <MuiThemeProvider muiTheme={theme}>
        <Router history={history}>
          <Redirect from='/' to='/routes'/>
          <Route path='/editor/:route' component={Editor}/>
          <Route path='/' component={Shell}>
            <Route path='/routes' component={RoutesView}/>
            <Route path='/routes/route/:route' component={RouteView}/>
            <Route path='/routes/favorite' component={Dummy}/>
            <Route path='/settings' component={Settings}/>
            <Route path='/about' component={About}/>
          </Route>
        </Router>
      </MuiThemeProvider>
    </Provider>
  }
}
