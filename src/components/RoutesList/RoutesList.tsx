import * as React from 'react'
import {Component, PropTypes} from 'react'

import {List, ListItem} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import CircularProgress from 'material-ui/CircularProgress'

import DirectionsBus from 'material-ui/svg-icons/maps/directions-bus'
import ActionsStars from 'material-ui/svg-icons/action/stars'

import {Route} from '../../models/Route'

const palette: any = require('!!sass-variable-loader!../../styles/_palette.scss')

const routeType = type => {
  if (type === 'bus') return 'городской автобус'
  if (type === 'shuttle') return 'пригородный автобус'
  if (type === 'trolleybus') return 'троллейбус'
}

export default class RoutesList extends Component<{
  routes: Array<any>
  favorites: Array<string>
  loading: boolean
  setFavorite: (id, favorite) => void
  selectRoute: (any) => void
}, {}> {
  render() {
    const {routes, loading, favorites} = this.props

    if (loading) return <CircularProgress style={{
        display: 'block',
        margin: '10% auto'
      }} />

    else return <List>
      {
        routes.map((route: Route, i) => {
          const isFavorite = favorites.indexOf(route._id) !== -1

          return <ListItem
            key={i}
            leftIcon={<DirectionsBus />}
            rightIconButton={
              <IconButton onTouchTap={() => this.props.setFavorite(route, !isFavorite)}>
                <ActionsStars color={isFavorite ? palette.colorAccent : ''}/>
              </IconButton>
            }
            primaryText={`№${route.routeNumber}`}
            secondaryText={routeType(route.routeType)}
            onTouchTap={() => this.props.selectRoute(route)}
          />
        })
      }
    </List>
  }
}
