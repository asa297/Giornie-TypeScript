import { WAIT_FOR_ACTION, ERROR_ACTION } from 'redux-wait-for-action'

import { actionTypes } from '@app/store/modules/group/type'
import { OrganizationFormBody } from '@app/helpers/form-types/organization-form-type'

export const loadGroups = () => ({
  type: actionTypes.LOAD_GROUPS,
  [WAIT_FOR_ACTION]: actionTypes.LOAD_GROUPS_SUCCESS,
  [ERROR_ACTION]: actionTypes.LOAD_GROUPS_FAILURE,
})

export const loadGroupsSuccess = (orgData: Array<any>) => ({
  type: actionTypes.LOAD_GROUPS_SUCCESS,
  payload: {
    orgData,
  },
})

export const loadGroupsFailure = (error: any) => ({
  type: actionTypes.LOAD_GROUPS_FAILURE,
  error,
})

export const createGroup = (formBody: OrganizationFormBody) => ({
  type: actionTypes.CREATE_GROUP,
  payload: { formBody },
  [WAIT_FOR_ACTION]: actionTypes.CREATE_GROUP_SUCCESS,
  [ERROR_ACTION]: actionTypes.CREATE_GROUP_FAILURE,
})

export const createGroupSuccess = () => ({
  type: actionTypes.CREATE_GROUP_SUCCESS,
})

export const createGroupFailure = (error: any) => ({
  type: actionTypes.CREATE_GROUP_FAILURE,
  error,
})

export const getGroup = (docId: string) => ({
  type: actionTypes.GET_GROUP,
  payload: {
    docId,
  },
  [WAIT_FOR_ACTION]: actionTypes.GET_GROUP_SUCCESS,
  [ERROR_ACTION]: actionTypes.GET_GROUP_FAILURE,
})

export const getGroupSuccess = (orgData: Array<any>) => ({
  type: actionTypes.GET_GROUP_SUCCESS,
  payload: {
    orgData,
  },
})

export const getGroupFailure = (error: any) => ({
  type: actionTypes.GET_GROUP_FAILURE,
  error,
})

export const updateGroup = (docId: string, formBody: OrganizationFormBody) => ({
  type: actionTypes.UPDATE_GROUP,
  payload: {
    docId,
    formBody,
  },
  [WAIT_FOR_ACTION]: actionTypes.UPDATE_GROUP_SUCCESS,
  [ERROR_ACTION]: actionTypes.UPDATE_GROUP_FAILURE,
})

export const updateGroupSuccess = () => ({
  type: actionTypes.UPDATE_GROUP_SUCCESS,
})

export const updateGroupFailure = (error: any) => ({
  type: actionTypes.UPDATE_GROUP_FAILURE,
  error,
})

export const deleteGroup = (docId: string) => ({
  type: actionTypes.DELETE_GROUP,
  payload: {
    docId,
  },
  [WAIT_FOR_ACTION]: actionTypes.DELETE_GROUP_SUCCESS,
  [ERROR_ACTION]: actionTypes.DELETE_GROUP_FAILURE,
})

export const deleteGroupSuccess = () => ({
  type: actionTypes.DELETE_GROUP_SUCCESS,
})

export const deleteGroupFailure = (error: any) => ({
  type: actionTypes.DELETE_GROUP_FAILURE,
  error,
})

export const setIsLoading = (isLoading: boolean) => ({
  type: actionTypes.IS_LOADING,
  payload: { isLoading },
})

export const setGroupModuleError = (key: string, error?: any) => ({
  type: actionTypes.SET_GROUP_MODULE_ERROR,
  payload: {
    key,
    error,
  },
})
