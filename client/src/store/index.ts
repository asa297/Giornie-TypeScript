import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { logger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import createReduxWaitForMiddleware from 'redux-wait-for-action'

import { rootSaga } from '@app/store/modules/root-saga'
import { rootReducer } from '@app/store/modules/root-reducer'

export const makeStore = () => {
  const browserHistory = createBrowserHistory()
  const sagaMiddleware = createSagaMiddleware()
  const myRouterMiddleware = routerMiddleware(browserHistory)

  let store
  if (process.env.NODE_ENV !== 'production') {
    store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, myRouterMiddleware, logger, createReduxWaitForMiddleware())))
  } else {
    store = createStore(rootReducer, applyMiddleware(sagaMiddleware, myRouterMiddleware, createReduxWaitForMiddleware()))
  }

  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState(state) {
      return state.get('routing')
    },
  })

  history.listen(_ => {
    window.scrollTo(0, 0)
  })

  sagaMiddleware.run(rootSaga)

  return { store, history }
}
