import axios from 'axios'
import { put, takeLeading, select } from 'redux-saga/effects'

import { actionTypes } from '@app/store/modules/organization/type'
import {
  getOrganations,
  setIsLoading,
  setOrganizationModuleError,
  getOrganationsSuccess,
} from '@app/store/modules/organization/action'
import { getAuthorizationHeader } from '@app/store/modules/auth/selector'
import { IOrganizationState } from '@app/store/modules/organization/reducer'

function* getOrganationsTask(action: ReturnType<typeof getOrganations>) {
  try {
    yield put(setIsLoading(true))

    const config = yield select(getAuthorizationHeader)

    const data: Array<IOrganizationState> = yield axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/org/getOrg`, config)
      .then(res => res.data)

    yield put(getOrganationsSuccess(data))
  } catch (error) {
    yield put(setOrganizationModuleError('getOrganations', 'มีบางอย่างผิดพลาด'))
  } finally {
    yield put(setIsLoading(false))
  }
}

export default [takeLeading(actionTypes.GET_ORGANIZATIONS, getOrganationsTask)]
