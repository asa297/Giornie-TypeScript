import { UserInfo } from '@app/store/modules/auth/reducer'
import { actionTypes } from '@app/store/modules/auth/type'

export const initialAuth = () => ({
  type: actionTypes.INITIAL_AUTH,
})

export const setInitialAuth = (isAuthenticated: boolean, isInitializing: boolean) => ({
  type: actionTypes.SET_INITIAL_AUTH_STATUS,
  payload: {
    isAuthenticated,
    isInitializing,
  },
})

export const setUserInfo = (userInfo: UserInfo) => ({
  type: actionTypes.SET_USER_INFO,
  payload: { userInfo },
})

export const setIsLoading = (isLoading: boolean) => ({
  type: actionTypes.IS_LOADING,
  payload: { isLoading },
})

export const login = (email, password) => ({
  type: actionTypes.LOGIN,
  payload: { email, password },
})

export const logout = () => ({
  type: actionTypes.LOGOUT,
})

export const setAuthModuleError = (key: string, error?: any) => ({
  type: actionTypes.SET_AUTH_MODULE_ERROR,
  payload: {
    key,
    error,
  },
})
