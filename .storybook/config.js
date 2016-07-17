import { configure } from '@kadira/storybook'

function loadStories() {
  require('./stories/app-view.jsx')
}

configure(loadStories, module)
