import React from 'react'
import {storiesOf, linkTo} from '@kadira/storybook'
import RoutesList from '../../.temp/components/RoutesList/RoutesList'

import muiTheme from '../decorators/muiTheme.jsx'

import route from '../data/route'

storiesOf('RoutesList', module)
  .addDecorator(muiTheme)
  .add('loading', () => (
    <RoutesList
      loading={true}
      routes={[]} />
  ))
  .add('empty list', () => (
    <RoutesList
      loading={false}
      routes={[]} />
  ))
  .add('full list', () => (
    <RoutesList
      loading={false}
      routes={[
        route,
        route,
        route,
        route,
        route,
        route,
        route,
        route,
        route,
        route,
        route
      ]} />
  ))
