import React, {Component, PropTypes} from 'react'
import mapboxgl from 'mapbox-gl'

export default class Map extends Component {
  static propTypes = {
    accessToken: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
    mapboxgl.accessToken = props.accessToken
  }

  render() {
    return <div className='Map'>
    </div>
  }
}
