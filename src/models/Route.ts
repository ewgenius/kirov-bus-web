import {Stop} from './Stop.ts'

export interface Route {
  _id: string
  route: string
  routeType: string
  routeNumber: string
  path: Array<{
    location: Array<number>
  }>
  stops: Array<Stop>
}
