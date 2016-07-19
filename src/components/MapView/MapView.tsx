import * as React from 'react'
import {Component, PropTypes} from 'react'
require('../../../src/components/MapView/MapView.scss')

import {set, lensProp} from 'ramda'
import * as mapboxgl from 'mapbox-gl'
import {Map} from 'mapbox-gl'

import CircularProgress from 'material-ui/CircularProgress'

const setkey = 'accessToken'
mapboxgl[setkey] = 'pk.eyJ1IjoiZXdnZW5pdXMiLCJhIjoiY2lxZGRleXI1MDA2cWh1bWNsbDF3ODY1YiJ9.IWqlnxi93GGmiBbbDD8aZQ'

interface MapProps {
  mapContainerId?: string
  styleUrl?: string
  center?: Array<number>
  zoom?: number
}

interface MapState {
  center: Array<number>
  loading: boolean
}

const lensLoading = lensProp('loading')

export default class MapView extends Component<MapProps, MapState> {
  static defaultProps = {
    mapContainerId: 'map-container',
    styleUrl: 'mapbox://styles/mapbox/light-v9',
    zoom: 13
  }

  state = {
    center: [49.6907981, 58.577939],
    loading: true
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
    this.map.on('load', () => {
      this.setState(set(lensLoading, false, this.state))
    })
    setTimeout(() => this.map.resize(), 1)
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
        latitude: 58.577939,
        longitude: 49.6907981
      })
    })
  }

  render() {
    return <div className='map-view'>
      { this.state.loading ? <div className='overlay-loading'>
        <CircularProgress style={{
          display: 'block',
          margin: '10% auto'
        }} />
      </div> : null }
      <div id={this.props.mapContainerId} style={{
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}/>
    </div>
  }
}
