import * as React from 'react'
import {render} from 'react-dom'
import App from './containers/App'

const container = document.getElementById('app')

Promise.resolve('serviceWorker' in navigator ? navigator['serviceWorker'].register('/sw.js') : 'no sw')
  .then(r => {
    console.log(r)
    render(<App />, container)
  })
