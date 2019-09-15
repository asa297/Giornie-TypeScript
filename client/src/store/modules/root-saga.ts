import { all } from 'redux-saga/effects'

import authSagaModule from './auth/saga'

export function* rootSaga() {
  yield all([...authSagaModule])
}
