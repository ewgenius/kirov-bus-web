import * as React from 'react'
import {Component} from 'react'

import {set, lensProp} from 'ramda'
import {
  Map,
  GeoJSONSource,
  LngLat
} from 'mapbox-gl'
import {Route} from '../../models/Route'

import CircularProgress from 'material-ui/CircularProgress'

const palette: any = require('!!sass-variable-loader!../../../src/styles/_palette.scss')

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

export default class MapEditor extends Component<MapProps, MapState> {
  static defaultProps = {
    width: '100%',
    height: '100%',
    mapContainerId: 'map-container',
    styleUrl: 'mapbox://styles/mapbox/light-v9',
    zoom: 13,
    showStops: true
  }

  state = {
    center: [49.6667983, 58.6035321],
    loading: true
  }

  private map: Map
  private pointsData: any
  private pointsSource: GeoJSONSource
  private routeData: any
  private routeSource: GeoJSONSource
  private stopsData: any
  private stopsSource: GeoJSONSource
  private isOverPoint: boolean = false
  private dragging: boolean = false

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
        this.pointsData = {
          type: 'FeatureCollection',
          features: []
        }

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

        this.pointsSource = new GeoJSONSource({
          data: this.pointsData
        })

        this.routeSource = new GeoJSONSource({
          data: this.routeData
        })

        this.stopsSource = new GeoJSONSource({
          data: this.stopsData
        })

        this.map.addSource('points', this.pointsSource)
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

        this.map.addLayer({
          'id': 'points',
          'type': 'circle',
          'source': 'points',
          'paint': {
            'circle-radius': 10,
            'circle-color': palette.colorAccent
          }
        })

        this.map.on('mousedown', event => {
          if (this.isOverPoint) {
            this.dragging = true
          }
        })

        this.map.on('mouseup', event => {
          this.dragging = false
        })

        this.map.on('mousemove', event => {
          const features = this.map.queryRenderedFeatures(event.point, {
            layers: ['points']
          })

          if (features.length) {
            this.isOverPoint = true
            if (this.dragging) {
              this.map['dragPan'].disable()
              features[0].geometry.coordinates = [event.lngLat.lng, event.lngLat.lat]
            }
          } else {
            this.isOverPoint = false
            this.map['dragPan'].enable()
            //this.map.setPaintProperty('point', 'circle-color', '#3887be')
            //canvas.style.cursor = '';
            //isCursorOverPoint = false;
            //map.dragPan.enable();
          }
        })

      })
  }

  renderRoute(route: Route) {
    this.pointsData.features = route.path.map(point => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: point.location
      },
      properties: {
        color: '#f00'
      }
    }))
    this.pointsSource.setData(this.pointsData)

    this.routeData.features[0].geometry.coordinates = route.path.map(point => point.location)
    this.routeSource.setData(this.routeData)

    this.stopsData.features = route.stops.map(stop => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: stop.location
      },
      properties: {
        title: stop.name
      }
    }))
    this.stopsSource.setData(this.stopsData)
  }

  render() {
    return <div className='map-editor view'>
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
