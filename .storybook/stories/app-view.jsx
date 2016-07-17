import React from 'react'
import {storiesOf, linkTo} from '@kadira/storybook'
import AppShell from '../../.temp/components/AppShell/AppShell'

import muiTheme from '../decorators/muiTheme.jsx'

storiesOf('AppView', module)
  .addDecorator(muiTheme)
  .add('default', () => (
    <AppShell
      sidebarOpen={false}
      onSidebarOpen={linkTo('AppView', 'sidebar open')}>
      content 1
    </AppShell>
  ))
  .add('sidebar open', () => (
    <AppShell
      sidebarOpen={true}
      onSidebarOpen={linkTo('AppView', 'default')}>
      content 1
    </AppShell>
  ))
