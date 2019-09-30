import { all } from 'redux-saga/effects'

import authSagaModule from '@app/store/modules/auth/saga'
import organizationSagaModule from '@app/store/modules/organization/saga'
import groupSagaModule from '@app/store/modules/group/saga'
import sellerSagaModule from '@app/store/modules/seller/saga'

export function* rootSaga() {
  yield all([...authSagaModule, ...organizationSagaModule, ...groupSagaModule, ...sellerSagaModule])
}
