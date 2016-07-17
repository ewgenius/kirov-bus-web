import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import AppShell from '../../.temp/components/AppShell/AppShell'

import {MuiThemeProvider} from 'material-ui/styles'
import theme from '../../.temp/styles/theme'
import '../../src/styles/main.scss'

storiesOf('Button', module)
  .add('default', () => (
    <MuiThemeProvider muiTheme={theme}>
      <AppShell sidebarOpen={false}/>
    </MuiThemeProvider>
  ))
