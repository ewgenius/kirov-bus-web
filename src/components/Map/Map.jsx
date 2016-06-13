import React, {Component, PropTypes} from 'react'
import * as mapboxgl from 'mapbox-gl'
mapboxgl.config.ACCESS_TOKEN = 'pk.eyJ1IjoiZXdnZW5pdXMiLCJhIjoiOWVhZDRmMmFmNjc2OTIxMjRhNWNlYWM1MWQwYjc4NzIifQ.wkZoq8jNF0WS_rLBfzbAtw'

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    console.log(mapboxgl)
    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [
        -74.50, 40
      ],
      zoom: 9
    })
  }

  render() {
    return <div className='Map'>
      <div id='map-container'></div>
    </div>
  }
}
