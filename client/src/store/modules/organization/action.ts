import { actionTypes } from '@app/store/modules/organization/type'
import { IOrganizationState } from '@app/store/modules/organization/reducer'

export const getOrganations = () => ({
  type: actionTypes.GET_ORGANIZATIONS,
})

export const getOrganationsSuccess = (orgData: Array<IOrganizationState>) => ({
  type: actionTypes.GET_ORGANIZATIONS_SUCCESS,
  payload: {
    orgData,
  },
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
