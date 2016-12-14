import * as React from 'react'
import { Component } from 'react'
import { render } from 'react-dom'

class App extends Component<any, any> {
  render() {
    return <div className="App">
      app
    </div>
  }
}

console.log('init app')

render(<App />, document.getElementById('root'))
