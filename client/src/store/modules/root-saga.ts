import { all } from 'redux-saga/effects'

import authSagaModule from '@app/store/modules/auth/saga'
import organizationSagaModule from '@app/store/modules/organization/saga'

export function* rootSaga() {
  yield all([...authSagaModule, ...organizationSagaModule])
}
