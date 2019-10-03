import axios from 'axios'
import { put, takeLeading, select } from 'redux-saga/effects'

import { actionTypes } from '@app/store/modules/item/type'
import {
  setIsLoading,
  setItemModuleError,
  loadItems,
  loadItemsSuccess,
  loadItemsFailure,
  createItem,
  createItemSuccess,
  createItemFailure,
  getItem,
  getItemSuccess,
  getItemFailure,
  updateItem,
  updateItemSuccess,
  updateItemFailure,
  deleteItem,
  deleteItemSuccess,
  deleteItemFailure,
} from '@app/store/modules/item/action'
import { getAuthorizationHeader } from '@app/store/modules/auth/selector'
import { IItem } from '@app/store/modules/item/reducer'

function* loadItemsTask(action: ReturnType<typeof loadItems>) {
  try {
    yield put(setIsLoading(true))

    const config = yield select(getAuthorizationHeader)

    const data: Array<IItem> = yield axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/item/loadItem`, config)
      .then(res => res.data)
      .catch(error => {
        throw error.response.data
      })

    yield put(loadItemsSuccess(data))
  } catch (error) {
    yield put(setItemModuleError('loadItems', 'มีบางอย่างผิดพลาด'))
    yield put(loadItemsFailure(error))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* createItemTask(action: ReturnType<typeof createItem>) {
  try {
    const { formBody } = action.payload
    yield put(setIsLoading(true))
    yield put(setItemModuleError('createItem'))

    const config = yield select(getAuthorizationHeader)

    if (formBody.item_file) {
      let uploadFormData = new FormData()
      uploadFormData.append('item_file', formBody.item_file)

      const uploadData = yield axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, uploadFormData, config)
        .then(res => res.data)
        .catch(error => {
          throw error.response.data
        })

      formBody.item_image_key = uploadData.key
      formBody.item_image_url = uploadData.location
    }

    yield axios.post(`${process.env.REACT_APP_SERVER_URL}/api/item/createItem`, formBody, config).catch(error => {
      throw error.response.data
    })

    yield put(createItemSuccess())
  } catch (error) {
    yield put(setItemModuleError('createItem', error))
    yield put(createItemFailure(error))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* getItemTask(action: ReturnType<typeof getItem>) {
  try {
    const { docId } = action.payload
    yield put(setIsLoading(true))

    const config = yield select(getAuthorizationHeader)

    const data: IItem = yield axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/item/getItem/${docId}`, config)
      .then(res => res.data)
      .catch(error => {
        throw error.response.data
      })

    yield put(getItemSuccess([data]))
  } catch (error) {
    yield put(setItemModuleError('getItem', error))
    yield put(getItemFailure(error))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* updateItemTask(action: ReturnType<typeof updateItem>) {
  try {
    const { docId, formBody } = action.payload
    yield put(setIsLoading(true))

    const config = yield select(getAuthorizationHeader)

    if (formBody.item_file) {
      let uploadFormData = new FormData()
      uploadFormData.append('item_file', formBody.item_file)

      const uploadData = yield axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, uploadFormData, config)
        .then(res => res.data)
        .catch(error => {
          throw error.response.data
        })

      formBody.item_image_key = uploadData.key
      formBody.item_image_url = uploadData.location
    }

    yield axios.put(`${process.env.REACT_APP_SERVER_URL}/api/item/updateItem/${docId}`, formBody, config).catch(error => {
      throw error.response.data
    })

    yield put(updateItemSuccess())
  } catch (error) {
    yield put(setItemModuleError('updateItem', error))
    yield put(updateItemFailure(error))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* deleteItemTask(action: ReturnType<typeof deleteItem>) {
  try {
    const { docId } = action.payload

    const config = yield select(getAuthorizationHeader)

    yield axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/item/deleteItem/${docId}`, config).catch(error => {
      throw error.response.data
    })

    yield put(deleteItemSuccess())
  } catch (error) {
    yield put(setItemModuleError('deleteItem', error))
    yield put(deleteItemFailure(error))
  }
}

export default [
  takeLeading(actionTypes.LOAD_ITEMS, loadItemsTask),
  takeLeading(actionTypes.CREATE_ITEM, createItemTask),
  takeLeading(actionTypes.GET_ITEM, getItemTask),
  takeLeading(actionTypes.UPDATE_ITEM, updateItemTask),
  takeLeading(actionTypes.DELETE_ITEM, deleteItemTask),
]
