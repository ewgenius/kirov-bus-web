import 'normalize.css';
import 'styles/App.scss';
import '../../node_modules/leaflet/dist/leaflet.css';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../theme.js';
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [51.505, -0.09]
    };
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

  render() {
    return (
      <div className="app">
        <AppBar title="где автобус"/>
        <Map className="map" style={{
          backgroundColor: '#242426'
        }} center={this.state.position} zoom={13}>
          <TileLayer url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png' attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/>
          <Marker position={this.state.position}>
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
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
