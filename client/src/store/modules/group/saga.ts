import axios from 'axios'
import { put, takeLeading, select } from 'redux-saga/effects'

import { actionTypes } from '@app/store/modules/group/type'
import {
  setIsLoading,
  loadGroups,
  createGroup,
  getGroup,
  updateGroup,
  deleteGroup,
  loadGroupsSuccess,
  setGroupModuleError,
  loadGroupsFailure,
  createGroupSuccess,
  createGroupFailure,
  getGroupSuccess,
  getGroupFailure,
  updateGroupSuccess,
  updateGroupFailure,
  deleteGroupSuccess,
  deleteGroupFailure,
} from '@app/store/modules/group/action'
import { getAuthorizationHeader } from '@app/store/modules/auth/selector'
import { IGroupState } from '@app/store/modules/group/reducer'

function* loadGroupsTask(action: ReturnType<typeof loadGroups>) {
  try {
    yield put(setIsLoading(true))

    const config = yield select(getAuthorizationHeader)

    const data: Array<IGroupState> = yield axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/group/loadGroup`, config)
      .then(res => res.data)
      .catch(error => {
        throw error.response.data
      })

    yield put(loadGroupsSuccess(data))
  } catch (error) {
    yield put(setGroupModuleError('loadGroup', 'มีบางอย่างผิดพลาด'))
    yield put(loadGroupsFailure(error))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* createGroupTask(action: ReturnType<typeof createGroup>) {
  try {
    const { formBody } = action.payload
    yield put(setIsLoading(true))
    yield put(setGroupModuleError('createGroup'))

    const config = yield select(getAuthorizationHeader)

    yield axios.post(`${process.env.REACT_APP_SERVER_URL}/api/group/createGroup`, formBody, config).catch(error => {
      throw error.response.data
    })

    yield put(createGroupSuccess())
  } catch (error) {
    yield put(setGroupModuleError('createGroup', error))
    yield put(createGroupFailure(error))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* getGroupTask(action: ReturnType<typeof getGroup>) {
  try {
    const { docId } = action.payload
    yield put(setIsLoading(true))

    const config = yield select(getAuthorizationHeader)

    const { data } = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/api/group/getGroup/${docId}`, config).catch(error => {
      throw error.response.data
    })

    yield put(getGroupSuccess([data]))
  } catch (error) {
    yield put(setGroupModuleError('getGroup', error))
    yield put(getGroupFailure(error))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* updateGroupTask(action: ReturnType<typeof updateGroup>) {
  try {
    const { docId, formBody } = action.payload
    yield put(setIsLoading(true))

    const config = yield select(getAuthorizationHeader)

    yield axios.put(`${process.env.REACT_APP_SERVER_URL}/api/group/updateGroup/${docId}`, formBody, config).catch(error => {
      throw error.response.data
    })

    yield put(updateGroupSuccess())
  } catch (error) {
    yield put(setGroupModuleError('updateGroup', error))
    yield put(updateGroupFailure(error))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* deleteGroupTask(action: ReturnType<typeof deleteGroup>) {
  try {
    const { docId } = action.payload

    const config = yield select(getAuthorizationHeader)

    yield axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/group/deleteGroup/${docId}`, config).catch(error => {
      throw error.response.data
    })

    yield put(deleteGroupSuccess())
  } catch (error) {
    yield put(setGroupModuleError('deleteGroup', error))
    yield put(deleteGroupFailure(error))
  }
}

export default [
  takeLeading(actionTypes.LOAD_GROUPS, loadGroupsTask),
  takeLeading(actionTypes.CREATE_GROUP, createGroupTask),
  takeLeading(actionTypes.GET_GROUP, getGroupTask),
  takeLeading(actionTypes.UPDATE_GROUP, updateGroupTask),
  takeLeading(actionTypes.DELETE_GROUP, deleteGroupTask),
]
