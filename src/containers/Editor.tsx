import * as React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import {goBack} from 'react-router-redux'

import {State} from '../configureStore'
import {Route} from '../models/Route'
import {Stop} from '../models/Stop'

// actions
import {requestRoute} from '../actions/routes'

// components
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import MapEditor from '../components/MapEditor/MapEditor'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'

//icons
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import ContentSave from 'material-ui/svg-icons/content/save'

interface EditorProps {
  loading: boolean
  route: any

  dispatch: any
  params: {
    route: string
  }
}

class Editor extends Component<EditorProps, any> {
  componentDidMount() {
    if (
      !this.props.route ||
      this.props.route.route !== this.props.params.route
    ) {
      this.props.dispatch(requestRoute(this.props.params.route))
    }
  }

  componentWillReceiveProps(nextProps: EditorProps) {
    if (this.props.params.route !== nextProps.params.route) {
      this.props.dispatch(requestRoute(nextProps.params.route))
    }
  }

  render() {
    return <div className='editor view'>
      <AppBar
        title='Редактор маршрутов'
        titleStyle={{
          fontSize: 20
        }}
        iconElementLeft={
          <IconButton onTouchTap={() => this.props.dispatch(goBack()) }>
            <NavigationArrowBack/>
          </IconButton>
        }
        />

      <Toolbar>
        <ToolbarGroup>
          <RaisedButton label="Save"/>
          <IconButton style={{
            margin: '4px 0'
          }}>
            <ContentSave />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>

      <div className='content toolbar'>
        <MapEditor
          editable={true}
          route={this.props.route}
          />
      </div>
    </div>
  }
}

export default connect((state: State) => {
  return {
    loading: state.routes.loadingRoute,
    route: state.routes.route
  }
})(Editor)