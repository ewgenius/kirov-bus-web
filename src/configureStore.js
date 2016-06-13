import { createStore, combineReducers } from 'redux'

const configureStore = () => {
  const store = createStore((state, action) => {
    return state
  })
  return store
}

export default configureStore
