import * as React from 'react'
import {render} from 'react-dom'
import App from './containers/App.tsx'

const container = document.getElementById('root')

Promise.resolve('serviceWorker' in navigator ? navigator['serviceWorker'].register('/sw.js') : 'no sw')
  .then(r => {
    console.log(r)
    render(<App />, container)
  })
