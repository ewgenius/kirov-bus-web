import 'normalize.css';
import 'styles/App.scss';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../theme.js';
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

const style = {
  margin: 12
};

class App extends React.Component {
  getChildContext() {
    return {muiTheme: ThemeManager.getMuiTheme(Theme)};
  }

  render() {
    return (
      <div className="app">
        <AppBar title="где автобус"/>
        <div>
          <FlatButton label="Default" style={style}/>
          <FlatButton label="Primary" primary={true} style={style}/>
          <FlatButton label="Secondary" secondary={true} style={style}/>
          <FlatButton label="Disabled" disabled={true} style={style}/>
        </div>
        <div>
          <RaisedButton label="Default" style={style}/>
          <RaisedButton label="Primary" primary={true} style={style}/>
          <RaisedButton label="Secondary" secondary={true} style={style}/>
          <RaisedButton label="Disabled" disabled={true} style={style}/>
        </div>
        <div>
          <TextField hintText="Hint Text"/><br/>
          <br/>
          <TextField hintText="The hint text can be as long as you want, it will wrap."/><br/>
          <TextField defaultValue="Default Value"/><br/>
          <TextField hintText="Hint Text" floatingLabelText="Floating Label Text"/><br/>
          <TextField hintText="Password Field" floatingLabelText="Password" type="password"/><br/>
          <TextField hintText="MultiLine with rows: 2 and rowsMax: 4" multiLine={true} rows={2} rowsMax={4}/><br/>
          <TextField hintText="Message Field" floatingLabelText="MultiLine and FloatingLabel" multiLine={true} rows={2}/>
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
