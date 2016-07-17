import { configure } from '@kadira/storybook'

function loadStories() {
  require('./stories/app-view.jsx')
  require('./stories/routes-list.jsx')
}

configure(loadStories, module)
