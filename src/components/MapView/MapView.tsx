import * as React from 'react'
import {Component, PropTypes} from 'react'

import * as mapboxgl from 'mapbox-gl'
import {Map} from 'mapbox-gl'

const setkey = 'accessToken'
mapboxgl[setkey] = 'pk.eyJ1IjoiZXdnZW5pdXMiLCJhIjoiY2lxZGRleXI1MDA2cWh1bWNsbDF3ODY1YiJ9.IWqlnxi93GGmiBbbDD8aZQ'

export default class MapView extends Component<{
  mapContainerId: string
  styleUrl: string
  center: Array<number>
  zoom: number
}, any> {
  static defaultProps = {
    mapContainerId: 'map-container',
    styleUrl: 'mapbox://styles/mapbox/streets-v9',
    center: [
      49.6469841003418,
      58.50543212890625
    ],
    zoom: 9
  }

  private map: Map

  componentDidMount() {
    console.log(this.props)
    this.map = new Map({
      container: this.props.mapContainerId,
      style: this.props.styleUrl,
      center: this.props.center,
      zoom: this.props.zoom
    })
  }

  render() {
    return <div className='map-view'>
      <div id={this.props.mapContainerId} />
    </div>
  }
}
