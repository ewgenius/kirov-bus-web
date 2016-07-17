import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {MuiThemeProvider} from 'material-ui/styles'
import theme from '../../.temp/styles/theme'
import '../../src/styles/main.scss'

let tapInjected = false
if (!tapInjected) {
  injectTapEventPlugin()
  tapInjected = true
}

export default story => (
  <MuiThemeProvider muiTheme={theme}>
    {story()}
  </MuiThemeProvider>
)
