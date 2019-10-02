import { WAIT_FOR_ACTION, ERROR_ACTION } from 'redux-wait-for-action'

import { actionTypes } from '@app/store/modules/item/type'
import { IItem } from '@app/store/modules/item/reducer'
import { ItemFormBody } from '@app/helpers/form-types/item-form-type'

export const loadItems = () => ({
  type: actionTypes.LOAD_ITEMS,
  [WAIT_FOR_ACTION]: actionTypes.LOAD_ITEMS_SUCCESS,
  [ERROR_ACTION]: actionTypes.LOAD_ITEMS_FAILURE,
})

export const loadItemsSuccess = (orgData: Array<IItem>) => ({
  type: actionTypes.LOAD_ITEMS_SUCCESS,
  payload: {
    orgData,
  },
})

export const loadItemsFailure = (error: any) => ({
  type: actionTypes.LOAD_ITEMS_FAILURE,
  error,
})

export const createItem = (formBody: ItemFormBody) => ({
  type: actionTypes.CREATE_ITEM,
  payload: { formBody },
  [WAIT_FOR_ACTION]: actionTypes.CREATE_ITEM_SUCCESS,
  [ERROR_ACTION]: actionTypes.CREATE_ITEM_FAILURE,
})

export const createItemSuccess = () => ({
  type: actionTypes.CREATE_ITEM_SUCCESS,
})

export const createItemFailure = (error: any) => ({
  type: actionTypes.CREATE_ITEM_FAILURE,
  error,
})

export const getItem = (docId: string) => ({
  type: actionTypes.GET_ITEM,
  payload: {
    docId,
  },
  [WAIT_FOR_ACTION]: actionTypes.GET_ITEM_SUCCESS,
  [ERROR_ACTION]: actionTypes.GET_ITEM_FAILURE,
})

export const getItemSuccess = (orgData: Array<IItem>) => ({
  type: actionTypes.GET_ITEM_SUCCESS,
  payload: {
    orgData,
  },
})

export const getItemFailure = (error: any) => ({
  type: actionTypes.GET_ITEM_FAILURE,
  error,
})

export const updateItem = (docId: string, formBody: ItemFormBody) => ({
  type: actionTypes.UPDATE_ITEM,
  payload: {
    docId,
    formBody,
  },
  [WAIT_FOR_ACTION]: actionTypes.UPDATE_ITEM_SUCCESS,
  [ERROR_ACTION]: actionTypes.UPDATE_ITEM_FAILURE,
})

export const updateItemSuccess = () => ({
  type: actionTypes.UPDATE_ITEM_SUCCESS,
})

export const updateItemFailure = (error: any) => ({
  type: actionTypes.UPDATE_ITEM_FAILURE,
  error,
})

export const deleteItem = (docId: string) => ({
  type: actionTypes.DELETE_ITEM,
  payload: {
    docId,
  },
  [WAIT_FOR_ACTION]: actionTypes.DELETE_ITEM_SUCCESS,
  [ERROR_ACTION]: actionTypes.DELETE_ITEM_FAILURE,
})

export const deleteItemSuccess = () => ({
  type: actionTypes.DELETE_ITEM_SUCCESS,
})

export const deleteItemFailure = (error: any) => ({
  type: actionTypes.DELETE_ITEM_FAILURE,
  error,
})

export const setIsLoading = (isLoading: boolean) => ({
  type: actionTypes.IS_LOADING,
  payload: { isLoading },
})

export const setItemModuleError = (key: string, error?: any) => ({
  type: actionTypes.SET_ITEM_MODULE_ERROR,
  payload: {
    key,
    error,
  },
})
