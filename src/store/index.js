import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import { saveState, loadState } from '../actions/localStorage'
import throttle from 'lodash.throttle'

const persistedState = loadState()
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, persistedState,
  storeEnhancers(applyMiddleware(thunk))
)

store.subscribe(throttle(() => {
  console.log("in saveState")
  saveState({
    session: store.getState()
  })
}, 1000))

export default store
