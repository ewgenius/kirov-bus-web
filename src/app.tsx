import './app.css'
import * as React from 'react'
import { Component } from 'react'
import { render } from 'react-dom'
import MapBoxView from './components/MapBoxView/MapBoxView'

class App extends Component<any, any> {
  render() {
    return <div className='App' style={{ width: '100%', height: '100%' }}>
      <MapBoxView />
    </div>
  }
}

render(<App />, document.getElementById('root'))
