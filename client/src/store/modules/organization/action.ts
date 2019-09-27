import { WAIT_FOR_ACTION, ERROR_ACTION } from 'redux-wait-for-action'

import { actionTypes } from '@app/store/modules/organization/type'
import { IOrganizationState } from '@app/store/modules/organization/reducer'
import { OrganizationFormBody } from '@app/helpers/form-types/organization-form-type'

export const loadOrganizations = () => ({
  type: actionTypes.LOAD_ORGANIZATIONS,
  [WAIT_FOR_ACTION]: actionTypes.LOAD_ORGANIZATIONS_SUCCESS,
  [ERROR_ACTION]: actionTypes.SET_ORGANIZATION_MODULE_ERROR,
})

export const loadOrganizationsSuccess = (orgData: Array<IOrganizationState>) => ({
  type: actionTypes.LOAD_ORGANIZATIONS_SUCCESS,
  payload: {
    orgData,
  },
})

export const loadOrganizationsFailure = (error: any) => ({
  type: actionTypes.LOAD_ORGANIZATIONS_FAILURE,
  error,
})

export const createOrganization = (formBody: OrganizationFormBody) => ({
  type: actionTypes.CREATE_ORGANIZATION,
  payload: { formBody },
  [WAIT_FOR_ACTION]: actionTypes.UPDATE_ORGANIZATION_SUCCESS,
  [ERROR_ACTION]: actionTypes.SET_ORGANIZATION_MODULE_ERROR,
})

export const createOrganizationSuccess = () => ({
  type: actionTypes.CREATE_ORGANIZATION_SUCCESS,
})

export const createOrganizationFailure = (error: any) => ({
  type: actionTypes.CREATE_ORGANIZATION_FAILURE,
  error,
})

export const getOrganization = (docId: string) => ({
  type: actionTypes.GET_ORGANIZATION,
  payload: {
    docId,
  },
  [WAIT_FOR_ACTION]: actionTypes.GET_ORGANIZATION_SUCCESS,
  [ERROR_ACTION]: actionTypes.SET_ORGANIZATION_MODULE_ERROR,
})

export const getOrganizationSuccess = (orgData: Array<IOrganizationState>) => ({
  type: actionTypes.GET_ORGANIZATION_SUCCESS,
  payload: {
    orgData,
  },
})

export const getOrganizationFailure = (error: any) => ({
  type: actionTypes.GET_ORGANIZATION_FAILURE,
  error,
})

export const updateOrganization = (docId: string, formBody: OrganizationFormBody) => ({
  type: actionTypes.UPDATE_ORGANIZATION,
  payload: {
    docId,
    formBody,
  },
  [WAIT_FOR_ACTION]: actionTypes.UPDATE_ORGANIZATION_SUCCESS,
  [ERROR_ACTION]: actionTypes.SET_ORGANIZATION_MODULE_ERROR,
})

export const updateOrganizationSuccess = () => ({
  type: actionTypes.UPDATE_ORGANIZATION_SUCCESS,
})

export const updateOrganizationFailure = (error: any) => ({
  type: actionTypes.UPDATE_ORGANIZATION_FAILURE,
  error,
})

export const setIsLoading = (isLoading: boolean) => ({
  type: actionTypes.IS_LOADING,
  payload: { isLoading },
})

export const setOrganizationModuleError = (key: string, error?: any) => ({
  type: actionTypes.SET_ORGANIZATION_MODULE_ERROR,
  payload: {
    key,
    error,
  },
})
