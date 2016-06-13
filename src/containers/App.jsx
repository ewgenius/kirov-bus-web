import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

const mapStateToProps = () => do {
  ({test: 'test'})
}

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  render() {
    return <div className='App'>
    app
    </div>
  }
}
export default connect(mapStateToProps)(App)
