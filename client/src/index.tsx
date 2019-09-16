import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import { makeStore } from '@app/store/index'

import App from './App'
import * as serviceWorker from './serviceWorker'

const { store, history } = makeStore()

console.log(store, history)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
