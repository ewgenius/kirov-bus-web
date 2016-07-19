import * as React from 'react'
import {Component} from 'react'
require('../../../src/components/MapView/MapView.scss')

import {set, lensProp} from 'ramda'
import * as mapboxgl from 'mapbox-gl'
import {
  Map,
  GeoJSONSource
} from 'mapbox-gl'
import {Route} from '../../models/Route'

import CircularProgress from 'material-ui/CircularProgress'

const setkey = 'accessToken'
mapboxgl[setkey] = 'pk.eyJ1IjoiZXdnZW5pdXMiLCJhIjoiY2lxZGRleXI1MDA2cWh1bWNsbDF3ODY1YiJ9.IWqlnxi93GGmiBbbDD8aZQ'

interface MapProps {
  mapContainerId?: string
  styleUrl?: string
  center?: Array<number>
  zoom?: number

  route?: Route
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
    center: [49.6667983, 58.6035321],
    loading: true
  }

  private map: Map
  private routeData: any
  private routeSource: GeoJSONSource

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.initMap()
      .then(() => {
        if (this.props.route)
          this.renderRoute(this.props.route)
      })
  }

  componentWillReceiveProps(nextProps: MapProps) {
    if (
      !this.state.loading && (
        !this.props.route && nextProps.route ||
        this.props.route && this.props.route.route !== nextProps.route.route
      )
    ) {
      this.renderRoute(nextProps.route)
    }
  }

  initMap() {
    this.map = new Map({
      container: this.props.mapContainerId,
      style: this.props.styleUrl,
      center: this.state.center,
      zoom: this.props.zoom
    })

    return new Promise(resolve => {
      this.map.on('load', () => {
        this.setState(set(lensLoading, false, this.state))
        this.map.resize()
        resolve(this.map)
      })
    })
      .then(() => {
        this.routeData = {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: []
            }
          }]
        }

        this.routeSource = new GeoJSONSource({
          data: this.routeData
        })

        this.map.addSource('route', this.routeSource)
        this.map.addLayer({
          id: 'route',
          source: 'route',
          type: 'line',
          paint: {
            'line-width': 2,
            'line-color': '#00bbaa'
          }
        })
      })
  }

  renderRoute(route: Route) {
    this.routeData.features[0].geometry.coordinates = route.path.map(point => point.location)
    this.routeSource.setData(this.routeData)
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
        latitude: 58.6035321,
        longitude: 49.6667983
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
