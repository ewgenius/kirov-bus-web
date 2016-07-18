import { configure } from '@kadira/storybook'

function loadStories() {
  require('./stories/routes-list.jsx')
  require('./stories/map-view.jsx')
}

configure(loadStories, module)
