import {compose, createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {persistStore} from 'redux-persist'

import {reducers, rootSaga} from './root'

/* eslint no-undef: 0 */

export default () => {
  const saga = createSagaMiddleware()
  const middleware = [saga]
  let composeEnhancers = compose

  if (typeof window !== 'undefined') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  }

  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware)),
  )

  persistStore(store)

  if (module.hot) {
    module.hot.accept(() => {
      const nextReducers = require('./root').reducers
      store.replaceReducer(nextReducers)
    })
  }

  saga.run(rootSaga)

  return store
}
