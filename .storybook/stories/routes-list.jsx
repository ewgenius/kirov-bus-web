import React from 'react'
import {storiesOf, linkTo} from '@kadira/storybook'
import RoutesList from '../../.temp/components/RoutesList/RoutesList'

import muiTheme from '../decorators/muiTheme.jsx'

import routes from '../data/routes'

const setFavorite = (id, favorite) => console.log(id, favorite)

storiesOf('RoutesList', module)
  .addDecorator(muiTheme)
  .add('loading', () => (
    <RoutesList
      loading={true}
      routes={[]}
      favorites={[]}
      setFavorite={setFavorite}/>
  ))
  .add('empty list', () => (
    <RoutesList
      loading={false}
      routes={[]}
      favorites={[]}
      setFavorite={setFavorite}/>
  ))
  .add('full list', () => (
    <RoutesList
      loading={false}
      routes={routes}
      favorites={[
        '5789e503dc2b1522111620b2'
      ]}
      setFavorite={setFavorite}/>
  ))
