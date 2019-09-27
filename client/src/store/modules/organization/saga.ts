import axios from 'axios'
import { put, takeLeading, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { actionTypes } from '@app/store/modules/organization/type'
import {
  loadOrganizations,
  setIsLoading,
  setOrganizationModuleError,
  loadOrganizationsSuccess,
  createOrganization,
  getOrganization,
  getOrganizationSuccess,
  updateOrganization,
  updateOrganizationSuccess,
  createOrganizationSuccess,
} from '@app/store/modules/organization/action'
import { getAuthorizationHeader } from '@app/store/modules/auth/selector'
import { IOrganizationState } from '@app/store/modules/organization/reducer'

function* loadOrganizationsTask(action: ReturnType<typeof loadOrganizations>) {
  try {
    yield put(setIsLoading(true))

    const config = yield select(getAuthorizationHeader)

    const data: Array<IOrganizationState> = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/api/org/loadOrg`, config).then(res => res.data)

    yield put(loadOrganizationsSuccess(data))
  } catch (error) {
    yield put(setOrganizationModuleError('loadOrganizations', 'มีบางอย่างผิดพลาด'))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* createOrganizationTask(action: ReturnType<typeof createOrganization>) {
  try {
    const { formBody } = action.payload
    yield put(setIsLoading(true))
    yield put(setOrganizationModuleError('createOrganation'))

    const config = yield select(getAuthorizationHeader)

    yield axios.post(`${process.env.REACT_APP_SERVER_URL}/api/org/createOrg`, formBody, config).catch(error => {
      throw error.response.data
    })

    yield put(createOrganizationSuccess())
  } catch (error) {
    yield put(setOrganizationModuleError('createOrganation', error))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* getOrganizationTask(action: ReturnType<typeof getOrganization>) {
  try {
    const { docId } = action.payload
    yield put(setIsLoading(true))

    const config = yield select(getAuthorizationHeader)

    const { data } = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/api/org/getOrg/${docId}`, config)

    yield put(getOrganizationSuccess([data]))
  } catch (error) {
    yield put(setOrganizationModuleError('getOrganization', error))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* updateOrganizationTask(action: ReturnType<typeof updateOrganization>) {
  try {
    const { docId, formBody } = action.payload
    yield put(setIsLoading(true))

    const config = yield select(getAuthorizationHeader)

    yield axios.put(`${process.env.REACT_APP_SERVER_URL}/api/org/updateOrg/${docId}`, formBody, config)

    yield put(updateOrganizationSuccess())
  } catch (error) {
    yield put(setOrganizationModuleError('updateOrganization', error))
  } finally {
    yield put(setIsLoading(false))
  }
}

export default [
  takeLeading(actionTypes.LOAD_ORGANIZATIONS, loadOrganizationsTask),
  takeLeading(actionTypes.CREATE_ORGANIZATION, createOrganizationTask),
  takeLeading(actionTypes.GET_ORGANIZATION, getOrganizationTask),
  takeLeading(actionTypes.UPDATE_ORGANIZATION, updateOrganizationTask),
]
