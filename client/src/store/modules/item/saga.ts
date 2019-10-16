import axios from 'axios'
import { put, takeLeading, select, takeLatest } from 'redux-saga/effects'
import * as R from 'ramda'

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
  searchItem,
  searchItemSuccess,
  searchItemFailure,
  changeQualtityItem,
  changeQualtityItemSuccess,
  changeQualtityItemFailure,
} from '@app/store/modules/item/action'
import { getAuthorizationHeader } from '@app/store/modules/auth/selector'
import { IItem, IPurchaseOrderItem } from '@app/store/modules/item/reducer'
import { getRootItemState, getPurchaseOrderListById } from '@app/store/modules/item/selector'

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

function* searchItemTask(action: ReturnType<typeof searchItem>) {
  try {
    const { itemCode } = action.payload

    yield put(setItemModuleError('searchItem'))

    const config = yield select(getAuthorizationHeader)

    const data: IItem = yield axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/item/searchItemByItemCode/${itemCode}`, config)
      .then(res => res.data)
      .catch(error => {
        throw error.response.data
      })

    if (data.item_qty_Shop1 === 0) {
      yield put(setItemModuleError('searchItem', 'จำนวนสินค้าหมด'))
      throw 'จำนวนสินค้าหมด'
    } else {
      let item: IPurchaseOrderItem = yield select(
        R.compose(
          getPurchaseOrderListById(data._id),
          getRootItemState,
        ),
      )

      if (item) {
        if (item.qualtity === data.item_qty_Shop1) {
          yield put(setItemModuleError('searchItem', 'จำนวนสินค้านี้ในรายการขายเท่ากับจำนวนสินค้านี้ในระบบ'))
          throw 'จำนวนสินค้านี้ในรายการขายเท่ากับจำนวนสินค้านี้ในระบบ'
        } else if (item.item_qty_Shop1 > data.item_qty_Shop1) {
          item.qualtity = data.item_qty_Shop1
        } else {
          ++item.qualtity
        }
      } else {
        item = { ...data }
        item.qualtity = 1
      }
      yield put(searchItemSuccess(item))
    }
  } catch (error) {
    yield put(setItemModuleError('searchItem', error))
    yield put(searchItemFailure(error))
  }
}

function* changeQualtityItemTask(action: ReturnType<typeof changeQualtityItem>) {
  try {
    const { itemId, qualtity } = action.payload

    yield put(setItemModuleError('changeQualtityItem'))

    const item: IPurchaseOrderItem = yield select(
      R.compose(
        getPurchaseOrderListById(itemId),
        getRootItemState,
      ),
    )

    if (qualtity > item.item_qty_Shop1) {
      throw `จำนวนสินค้ารหัส ${item.item_code} ในรายการขายเท่ากับจำนวนสินค้าในระบบ`
    }

    yield put(changeQualtityItemSuccess(item._id, qualtity))
  } catch (error) {
    yield put(setItemModuleError('changeQualtityItem', error))
    yield put(changeQualtityItemFailure(error))
  }
}

export default [
  takeLeading(actionTypes.LOAD_ITEMS, loadItemsTask),
  takeLeading(actionTypes.CREATE_ITEM, createItemTask),
  takeLeading(actionTypes.GET_ITEM, getItemTask),
  takeLeading(actionTypes.UPDATE_ITEM, updateItemTask),
  takeLeading(actionTypes.DELETE_ITEM, deleteItemTask),
  takeLeading(actionTypes.SEARCH_ITEM, searchItemTask),
  takeLatest(actionTypes.CHANGE_QUALTITY_ITEM, changeQualtityItemTask),
]
