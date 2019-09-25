import { WAIT_FOR_ACTION, ERROR_ACTION } from 'redux-wait-for-action'

import { actionTypes } from '@app/store/modules/organization/type'
import { IOrganizationState } from '@app/store/modules/organization/reducer'
import { OrganizationFormBody } from '@app/helpers/form-types/organization-form-type'

export const getOrganations = () => ({
  type: actionTypes.GET_ORGANIZATIONS,
  [WAIT_FOR_ACTION]: actionTypes.GET_ORGANIZATIONS_SUCCESS,
  [ERROR_ACTION]: actionTypes.SET_AUTH_MODULE_ERROR,
})

export const getOrganationsSuccess = (orgData: Array<IOrganizationState>) => ({
  type: actionTypes.GET_ORGANIZATIONS_SUCCESS,
  payload: {
    orgData,
  },
})

export const createOrganization = (formBody: OrganizationFormBody) => ({
  type: actionTypes.CREATE_ORGANIZATION,
  payload: { formBody },
})

export const setIsLoading = (isLoading: boolean) => ({
  type: actionTypes.IS_LOADING,
  payload: { isLoading },
})

export const setOrganizationModuleError = (key: string, error?: any) => ({
  type: actionTypes.SET_AUTH_MODULE_ERROR,
  payload: {
    key,
    error,
  },
})
