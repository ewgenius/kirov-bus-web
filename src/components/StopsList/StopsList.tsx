import * as React from 'react'
import {Component} from 'react'
require('../../../src/components/MapView/MapView.scss')

import {Stop} from '../../models/Stop'

import {List, ListItem} from 'material-ui/List'
import DirectionsBus from 'material-ui/svg-icons/maps/directions-bus'

const palette: any = require('!!sass-variable-loader!../../../src/styles/_palette.scss')

interface StopsProps {
  stops: Array<Stop>
  selectStop: (Stop) => void
}

export default class StopsList extends Component<StopsProps, any> {
  render() {
    return <div className='stops-list'>
      <List>
        {this.props.stops.map((stop, i) => <ListItem
          key={i}
          leftIcon={<DirectionsBus />}
          primaryText={stop.name}
          onTouchTap={() => this.props.selectStop(stop)}
           />
        ) }
      </List>
    </div>
  }
}
