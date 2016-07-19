import * as React from 'react'
import {Component} from 'react'
require('../../../src/components/MapView/MapView.scss')

import {set, lensProp} from 'ramda'
import * as mapboxgl from 'mapbox-gl'
import {
  Map,
  GeoJSONSource,
  LngLat
} from 'mapbox-gl'
import {Route} from '../../models/Route'

import CircularProgress from 'material-ui/CircularProgress'

const palette: any = require('!!sass-variable-loader!../../../src/styles/_palette.scss')

const setkey = 'accessToken'
mapboxgl[setkey] = 'pk.eyJ1IjoiZXdnZW5pdXMiLCJhIjoiY2lxZGRleXI1MDA2cWh1bWNsbDF3ODY1YiJ9.IWqlnxi93GGmiBbbDD8aZQ'

interface MapProps {
  width?: string | number,
  height?: string | number,
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
    width: '100%',
    height: '100%',
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
  private stopsData: any
  private stopsSource: GeoJSONSource

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

    if (this.props.center !== nextProps.center) {
      this.map.jumpTo({
        center: new LngLat(nextProps.center[0], nextProps.center[1]),
      })
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
        // data
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

        this.stopsData = {
          type: 'FeatureCollection',
          features: []
        }

        // sources

        this.routeSource = new GeoJSONSource({
          data: this.routeData
        })

        this.stopsSource = new GeoJSONSource({
          data: this.stopsData
        })

        this.map.addSource('route', this.routeSource)
        this.map.addSource('stops', this.stopsSource)

        // layers

        this.map.addLayer({
          id: 'route',
          source: 'route',
          type: 'line',
          paint: {
            'line-width': 4,
            'line-color': palette.colorAccent
          }
        })

        this.map.addLayer({
          id: 'stops',
          source: 'stops',
          type: 'symbol',
          layout: {
            'icon-image': 'bus-15',
            'text-field': '{title}',
            'text-offset': [0, 0.6],
            'text-anchor': 'top'
          },
          paint: {
            //'icon-color': palette.colorAccent,
            //'text-color': palette.colorAccent            
          }
        })
      })
  }

  renderRoute(route: Route) {
    this.routeData.features[0].geometry.coordinates = route.path.map(point => point.location)
    this.routeSource.setData(this.routeData)

    this.stopsData.features = route.stops.map(stop => ({
      type: 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': stop.location
      },
      'properties': {
        'title': stop.name
      }
    }))
    this.stopsSource.setData(this.stopsData)
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
        width: this.props.width,
        height: this.props.height
      }}/>
    </div>
  }
}
