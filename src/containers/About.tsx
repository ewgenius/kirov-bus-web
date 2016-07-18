import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {goBack} from 'react-router-redux'

// components
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'

//icons
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

@connect()
export default class About extends Component<any, any> {
  render() {
    return <div className='about view'>
    <AppBar
      title='О приложении'
      titleStyle={{
        fontSize: 20
      }}
      iconElementLeft={
        <IconButton onTouchTap={() => this.props.dispatch(goBack())}>
          <NavigationArrowBack/>
        </IconButton>
      }
      />

      <div className='content padding'>
        о приложении
      </div>
    </div>
  }
}
