import * as React from 'react'
import {Component, PropTypes} from 'react'

import * as mapboxgl from 'mapbox-gl'
import {Map} from 'mapbox-gl'

const setkey = 'accessToken'
mapboxgl[setkey] = 'pk.eyJ1IjoiZXdnZW5pdXMiLCJhIjoiY2lxZGRleXI1MDA2cWh1bWNsbDF3ODY1YiJ9.IWqlnxi93GGmiBbbDD8aZQ'

export default class MapView extends Component<{
  mapContainerId: string
  styleUrl: string
  center?: Array<number>
  zoom: number
}, {
  center: Array<number>
}> {
  static defaultProps = {
    mapContainerId: 'map-container',
    styleUrl: 'mapbox://styles/mapbox/light-v9',
    zoom: 13
  }

  state = {
    center: [49.6907981, 58.577939]
  }

  private map: Map

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.initMap()
  }

  initMap() {
    this.map = new Map({
      container: this.props.mapContainerId,
      style: this.props.styleUrl,
      center: this.state.center,
      zoom: this.props.zoom
    })
  }

  getCurrentPosition(): Promise<{
    latitude: number
    longitude: number
  }> {
    return new Promise(resolve => {
      if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(position => {
          resolve(position.coords)
        })
      else resolve({
        latitude:58.577939,
        longitude:49.6907981
      })
    })
  }

  render() {
    return <div className='map-view view'>
      <div id={this.props.mapContainerId} style={{
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}/>
    </div>
  }
}
