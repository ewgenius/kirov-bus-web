import 'normalize.css';
import 'styles/App.scss';
import '../../node_modules/leaflet/dist/leaflet.css';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../theme.js';
import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import AppBar from 'material-ui/lib/app-bar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import DirectionsBus from 'material-ui/lib/svg-icons/maps/directions-bus';
import IconButton from 'material-ui/lib/icon-button';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import {Map, Marker, Popup, TileLayer, ZoomControl, Polyline} from 'react-leaflet';
import {Icon} from 'leaflet';
import io from 'socket.io-client';
import routes from '../sources/dataRoutes.js';

const sidebarWidth = 256;
const responsiveWidth = 480;
function expanded() {
  return document.body.offsetWidth > responsiveWidth;
}
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
      selectedRoute: null,
      scheme: [],
      busstops: [],
      buses: [],
      sidebarDocked: expanded(),
      sidebarOpen: expanded(),
      mainStyle: {
        left: expanded() ? sidebarWidth : 0
      }
    };

    this.socket = io(apiUrl);
    this.socket.on('connected', () => {
      console.log(`connected to ${apiUrl}`);
    });

    this.socket.on('route.update', update => {
      if(update.route === this.state.selectedRoute.value) {
        console.log(update);
        this.setState({
          buses: Object.keys(update.data).map(key => update.data[key])
        });
      }
    });

    window.onresize = this.resize.bind(this);
  }

  resize() {
    this.setState({
      sidebarDocked: expanded(),
      sidebarOpen: expanded(),
      mainStyle: {
        left: expanded() ? sidebarWidth : 0
      }
    });
    this.refs['map'].getLeafletElement().invalidateSize(true);
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

  toggleSidebar(open) {
    this.setState({
      sidebarOpen: open,
      mainStyle: {
        left: expanded() ? (open ? sidebarWidth : 0) : 0
      }
    });
    this.refs['map'].getLeafletElement().invalidateSize(true);
  }

  getRoute(route) {
    this.setState({
      scheme: [],
      busstops: [],
      buses: []
    });
    fetch(`${apiUrl}/api/route?route=${route.value}`)
      .then(r => r.json())
      .then(result => {
        if (this.state.selectedRoute)
          this.socket.emit('unsubscribe', this.state.selectedRoute.value);
        this.setState({
          selectedRoute: route,
          scheme: result.scheme.map(point => [Number(point.lat), Number(point.lng)]),
          busstops: result.busstop
        });
        this.socket.emit('subscribe', route.value);
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="app">
        <LeftNav
          docked={this.state.sidebarDocked}
          open={this.state.sidebarOpen}
          onRequestChange={open => this.toggleSidebar(open)}
          width={sidebarWidth}>
          <AppBar />
          <List className="routes-list">
            {routes.map((route, i) => <ListItem primaryText={route.name} leftIcon={<DirectionsBus />} key={i} onClick={() => this.getRoute(route)}/>)}
          </List>
        </LeftNav>

        <div className="main" style={this.state.mainStyle}>
          <AppBar
            iconElementLeft={<IconButton onClick={() => this.toggleSidebar(!this.state.sidebarOpen)}><NavigationMenu/></IconButton>}/>
          <Map ref="map" className="map" center={this.state.position} zoom={12} zoomControl={false}>
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
      </div>
    );
  }
}

App.defaultProps = {};

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default App;
