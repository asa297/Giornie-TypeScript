import { all } from 'redux-saga/effects'

import authSagaModule from '@app/store/modules/auth/saga'

export function* rootSaga() {
  yield all([...authSagaModule])
}
