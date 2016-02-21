import 'normalize.css';
import 'styles/App.scss';
import '../../node_modules/leaflet/dist/leaflet.css';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../theme.js';
import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DirectionsBus from 'material-ui/lib/svg-icons/maps/directions-bus';
import {Map, Marker, Popup, TileLayer, ZoomControl, Polyline} from 'react-leaflet';
import {Icon} from 'leaflet';
import io from 'socket.io-client';
import routes from '../sources/dataRoutes.js';

const apiUrl = location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://kirov-bus.herokuapp.com';

const stopIcon = new Icon({
  iconUrl: require('../images/AWT-Bus.png'),
  iconSize: [24, 24]
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [
        51.505, -0.09
      ],
      navOpen: true,
      scheme: [],
      busstops: [],
      buses: []
    };

    this.socket = io(apiUrl);
    this.socket.on('connected', () => {
      console.log(`connected to ${apiUrl}`);
    });

    this.socket.on('route.update', update => {
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
    this.setState({
      scheme: [],
      busstops: []
    });
    fetch(`${apiUrl}/api/route?route=${route.value}`)
      .then(r => r.json())
      .then(result => {
        this.setState({
          scheme: result.scheme.map(point => [Number(point.lat), Number(point.lng)]),
          busstops: result.busstop
        });
        //this.socket.emit('subscribe', route.value);
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="app">
        <LeftNav open={this.state.navOpen}>
          {routes.map((route, i) => <MenuItem primaryText={route.name} leftIcon={<DirectionsBus />} key={i} onClick={() => this.getRoute(route)}/>)}
        </LeftNav>
        <Map className="map" style={{
          left: 256,
          backgroundColor: '#242426'
        }} center={this.state.position} zoom={12} zoomControl={false}>
          <TileLayer url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png' attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/>
          {
            this.state.busstops.map((stop, i) => <Marker key={i} icon={stopIcon} position={[Number(stop.lat), Number(stop.lng)]}>
                <Popup>
                  <span>{stop.stop_name}</span>
                </Popup>
              </Marker>)
          }
          {
            this.state.buses.map((bus, i) => <Marker key={i} position={[Number(bus.lat), Number(bus.lng)]}>
                <Popup>
                  <span>{bus.info}</span>
                </Popup>
              </Marker>)
          }
          <Polyline color={Theme.palette.accent1Color} positions={this.state.scheme} />
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
