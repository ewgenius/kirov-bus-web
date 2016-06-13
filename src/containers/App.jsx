import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
import '../styles/main.scss'

const muiTheme = getMuiTheme({})

const mapStateToProps = () => do {
  ({test: 'test'})
}

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  render() {
    return <MuiThemeProvider muiTheme={muiTheme}>
      <div className='App'>
        <AppBar title='Kirov bus'/>
      </div>
    </MuiThemeProvider>
  }
}
export default connect(mapStateToProps)(App)
