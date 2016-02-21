import 'normalize.css';
import 'styles/App.scss';
import '../../node_modules/leaflet/dist/leaflet.css';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../theme.js';
import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import {Map, Marker, Popup, TileLayer, ZoomControl} from 'react-leaflet';
import io from 'socket.io-client';
import routes from '../sources/dataRoutes.js';

const apiUrl = location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://kirov-bus.herokuapp.com';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [
        51.505, -0.09
      ],
      navOpen: true,
      scheme: [],
      busstops: []
    };

    const socket = io(apiUrl);
    socket.on('connected', () => {
      console.log(`connected to ${apiUrl}`);
    });

    socket.on('route.update', update => {
      console.log(update);
    });
  }

  getChildContext() {
    return {muiTheme: ThemeManager.getMuiTheme(Theme)};
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => this.setState({
        position: [position.coords.latitude, position.coords.longitude]
      }));
    }
  }

  toggleNav() {
    this.setState({
      navOpen: !this.state.navOpen
    });
  }

  getRoute(route) {
    fetch(`${apiUrl}/api/route?route=${route.value}`)
      .then(r => r.json())
      .then(result => {
        this.setState({
          scheme: result.scheme,
          busstops: result.busstop
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="app">
        <LeftNav open={this.state.navOpen}>
          {routes.map((route, i) => <MenuItem key={i} onClick={() => this.getRoute(route)}>{route.name}</MenuItem>)}
        </LeftNav>
        <Map className="map" style={{
          left: 256,
          backgroundColor: '#242426'
        }} center={this.state.position} zoom={13} zoomControl={false}>
          <TileLayer url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png' attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/>
          {
            this.state.busstops.map((stop, i) => <Marker key={i} position={[Number(stop.lat), Number(stop.lng)]}>
                <Popup>
                  <span>{stop.stop_name}</span>
                </Popup>
              </Marker>)
          }
          <ZoomControl position='bottomright'/>
        </Map>
      </div>
    );
  }
}

App.defaultProps = {};

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default App;
