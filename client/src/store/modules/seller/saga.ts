import axios from 'axios'
import { put, takeLeading, select } from 'redux-saga/effects'

import { actionTypes } from '@app/store/modules/seller/type'
import {
  setIsLoading,
  loadSellers,
  loadSellersSuccess,
  setSellerModuleError,
  loadSellersFailure,
  createSeller,
  createSellerSuccess,
  createSellerFailure,
  getSeller,
  getSellerSuccess,
  getSellerFailure,
  updateSeller,
  updateSellerSuccess,
  updateSellerFailure,
  deleteSeller,
  deleteSellerSuccess,
  deleteSellerFailure,
} from '@app/store/modules/seller/action'
import { getAuthorizationHeader } from '@app/store/modules/auth/selector'
import { ISeller } from '@app/store/modules/seller/reducer'

function* loadSellersTask(action: ReturnType<typeof loadSellers>) {
  try {
    yield put(setIsLoading(true))

    const config = yield select(getAuthorizationHeader)

    const data: Array<ISeller> = yield axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/seller/loadSeller`, config)
      .then(res => res.data)
      .catch(error => {
        throw error.response.data
      })

    yield put(loadSellersSuccess(data))
  } catch (error) {
    yield put(setSellerModuleError('loadSellers', 'มีบางอย่างผิดพลาด'))
    yield put(loadSellersFailure(error))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* createSellerTask(action: ReturnType<typeof createSeller>) {
  try {
    const { formBody } = action.payload
    yield put(setIsLoading(true))
    yield put(setSellerModuleError('createSeller'))

    const config = yield select(getAuthorizationHeader)

    yield axios.post(`${process.env.REACT_APP_SERVER_URL}/api/seller/createSeller`, formBody, config).catch(error => {
      throw error.response.data
    })

    yield put(createSellerSuccess())
  } catch (error) {
    yield put(setSellerModuleError('createSeller', error))
    yield put(createSellerFailure(error))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* getSellerTask(action: ReturnType<typeof getSeller>) {
  try {
    const { docId } = action.payload
    yield put(setIsLoading(true))

    const config = yield select(getAuthorizationHeader)

    const data: ISeller = yield axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/seller/getSeller/${docId}`, config)
      .then(res => res.data)
      .catch(error => {
        throw error.response.data
      })

    yield put(getSellerSuccess([data]))
  } catch (error) {
    yield put(setSellerModuleError('getSeller', error))
    yield put(getSellerFailure(error))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* updateSellerTask(action: ReturnType<typeof updateSeller>) {
  try {
    const { docId, formBody } = action.payload
    yield put(setIsLoading(true))

    const config = yield select(getAuthorizationHeader)

    yield axios.put(`${process.env.REACT_APP_SERVER_URL}/api/seller/updateSeller/${docId}`, formBody, config).catch(error => {
      throw error.response.data
    })

    yield put(updateSellerSuccess())
  } catch (error) {
    yield put(setSellerModuleError('updateSeller', error))
    yield put(updateSellerFailure(error))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* deleteSellerTask(action: ReturnType<typeof deleteSeller>) {
  try {
    const { docId } = action.payload

    const config = yield select(getAuthorizationHeader)

    yield axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/seller/deleteSeller/${docId}`, config).catch(error => {
      throw error.response.data
    })

    yield put(deleteSellerSuccess())
  } catch (error) {
    yield put(setSellerModuleError('deleteSeller', error))
    yield put(deleteSellerFailure(error))
  }
}

export default [
  takeLeading(actionTypes.LOAD_SELLERS, loadSellersTask),
  takeLeading(actionTypes.CREATE_SELLER, createSellerTask),
  takeLeading(actionTypes.GET_SELLER, getSellerTask),
  takeLeading(actionTypes.UPDATE_SELLER, updateSellerTask),
  takeLeading(actionTypes.DELETE_SELLER, deleteSellerTask),
]
