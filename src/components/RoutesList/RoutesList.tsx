import * as React from 'react'
import {Component, PropTypes} from 'react'

import {List, ListItem} from 'material-ui/List'
import CircularProgress from 'material-ui/CircularProgress'

import DirectionsBus from 'material-ui/svg-icons/maps/directions-bus'
import ActionsStars from 'material-ui/svg-icons/action/stars'

import {Route} from '../../models/Route'

export default class RoutesList extends Component<{
  routes: Array<any>
  loading: boolean
}, {}> {
  render() {
    const {routes, loading} = this.props

    if (loading) return <CircularProgress style={{
        display: 'block',
        margin: '10% auto'
      }} />

    else return <List>
      {
        routes.map((route: Route, i) => {
          return <ListItem
            key={i}
            leftIcon={<DirectionsBus />}
            rightIcon={<ActionsStars />}
            primaryText={`№${route.routeNumber}`}
            secondaryText={route.routeType}
          />
        })
      }
    </List>
  }
}
