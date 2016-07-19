import * as React from 'react'
import {Component} from 'react'

export interface FeatureCollection {

}

export interface Source {
  id: string
  type: string
  data: FeatureCollection
}

export interface LayerProps {
/*  id: string
  source: any
  type: string
  paint: any*/
}

export default class Layer extends Component<LayerProps, any> {
  render() {
    return null
  }
}