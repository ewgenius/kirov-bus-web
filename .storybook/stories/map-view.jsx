import React from 'react'
import {storiesOf, linkTo} from '@kadira/storybook'
import MapView from '../../.temp/components/MapView/MapView'

import muiTheme from '../decorators/muiTheme.jsx'

storiesOf('MapView', module)
  .addDecorator(muiTheme)
  .add('default', () => (
    <MapView mapContainerId='map'/>
  ))
