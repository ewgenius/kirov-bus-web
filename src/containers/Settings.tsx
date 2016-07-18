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
export default class Settings extends Component<any, any> {
  render() {
    return <div className='settings view'>
    <AppBar
      title='Настройки'
      titleStyle={{
        fontSize: 20
      }}
      iconElementLeft={
        <IconButton onTouchTap={() => this.props.dispatch(goBack())}>
          <NavigationArrowBack/>
        </IconButton>
      }
      />

      <div className='content'>
        настройки
      </div>
    </div>
  }
}
