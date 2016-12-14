import './MapBoxView.css'
import * as React from 'react'
import { Component, Props } from 'react'
// eslint-disable-next-line
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

export default class MapBoxView extends Component<Props<any>, {}> {
  constructor() {
    super();
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZXdnZW5pdXMiLCJhIjoiY2lxZGRleXI1MDA2cWh1bWNsbDF3ODY1YiJ9.IWqlnxi93GGmiBbbDD8aZQ'
  }

  get mapboxContainer() {
    return this.refs['mapboxContainer'] as HTMLDivElement
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapboxContainer,
      style: 'mapbox://styles/mapbox/streets-v9'
    })

    console.log(map)
  }

  render() {
    return <div className='mapbox-view'>
      <div ref='mapboxContainer' className='mapbox-container' />
    </div>
  }
}