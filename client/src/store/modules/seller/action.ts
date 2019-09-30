import { WAIT_FOR_ACTION, ERROR_ACTION } from 'redux-wait-for-action'

import { actionTypes } from '@app/store/modules/seller/type'
import { ISeller } from '@app/store/modules/seller/reducer'
import { SellerFormBody } from '@app/helpers/form-types/seller-form-type'

export const loadSellers = () => ({
  type: actionTypes.LOAD_SELLERS,
  [WAIT_FOR_ACTION]: actionTypes.LOAD_SELLERS_SUCCESS,
  [ERROR_ACTION]: actionTypes.LOAD_SELLERS_FAILURE,
})

export const loadSellersSuccess = (orgData: Array<ISeller>) => ({
  type: actionTypes.LOAD_SELLERS_SUCCESS,
  payload: {
    orgData,
  },
})

export const loadSellersFailure = (error: any) => ({
  type: actionTypes.LOAD_SELLERS_FAILURE,
  error,
})

export const createSeller = (formBody: SellerFormBody) => ({
  type: actionTypes.CREATE_SELLER,
  payload: { formBody },
  [WAIT_FOR_ACTION]: actionTypes.CREATE_SELLER_SUCCESS,
  [ERROR_ACTION]: actionTypes.CREATE_SELLER_FAILURE,
})

export const createSellerSuccess = () => ({
  type: actionTypes.CREATE_SELLER_SUCCESS,
})

export const createSellerFailure = (error: any) => ({
  type: actionTypes.CREATE_SELLER_FAILURE,
  error,
})

export const getSeller = (docId: string) => ({
  type: actionTypes.GET_SELLER,
  payload: {
    docId,
  },
  [WAIT_FOR_ACTION]: actionTypes.GET_SELLER_SUCCESS,
  [ERROR_ACTION]: actionTypes.GET_SELLER_FAILURE,
})

export const getSellerSuccess = (orgData: Array<ISeller>) => ({
  type: actionTypes.GET_SELLER_SUCCESS,
  payload: {
    orgData,
  },
})

export const getSellerFailure = (error: any) => ({
  type: actionTypes.GET_SELLER_FAILURE,
  error,
})

export const updateSeller = (docId: string, formBody: SellerFormBody) => ({
  type: actionTypes.UPDATE_SELLER,
  payload: {
    docId,
    formBody,
  },
  [WAIT_FOR_ACTION]: actionTypes.UPDATE_SELLER_SUCCESS,
  [ERROR_ACTION]: actionTypes.UPDATE_SELLER_FAILURE,
})

export const updateSellerSuccess = () => ({
  type: actionTypes.UPDATE_SELLER_SUCCESS,
})

export const updateSellerFailure = (error: any) => ({
  type: actionTypes.UPDATE_SELLER_FAILURE,
  error,
})

export const deleteSeller = (docId: string) => ({
  type: actionTypes.DELETE_SELLER,
  payload: {
    docId,
  },
  [WAIT_FOR_ACTION]: actionTypes.DELETE_SELLER_SUCCESS,
  [ERROR_ACTION]: actionTypes.DELETE_SELLER_FAILURE,
})

export const deleteSellerSuccess = () => ({
  type: actionTypes.DELETE_SELLER_SUCCESS,
})

export const deleteSellerFailure = (error: any) => ({
  type: actionTypes.DELETE_SELLER_FAILURE,
  error,
})

export const setIsLoading = (isLoading: boolean) => ({
  type: actionTypes.IS_LOADING,
  payload: { isLoading },
})

export const setSellerModuleError = (key: string, error?: any) => ({
  type: actionTypes.SET_SELLER_MODULE_ERROR,
  payload: {
    key,
    error,
  },
})
