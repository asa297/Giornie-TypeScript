import { fromJS } from 'immutable'

import { IAuthState } from '@app/store/modules/auth/reducer'
import { MODULE_NAME } from '@app/store/modules/auth/type'
import { get, getOr } from '@app/store/modules/helpers/ramda'

export const getRootAuthState = state => state.getIn([MODULE_NAME], fromJS({})).toJS() as IAuthState
export const getAuthIsLoading = get<IAuthState['isLoading']>(`isLoading`)
export const getAuthError = get<IAuthState['error']>('error')
export const getAuthErrorText = (errorKey: string) => get<IAuthState['error']>(`error.${errorKey}`)
export const getAuthIsAuthenticated = get<IAuthState['isAuthenticated']>(`isAuthenticated`)
export const getAuthIsInitializing = get<IAuthState['isInitializing']>(`isInitializing`)

export const getUser = get<IAuthState['user']>(`user`)
export const getUserInfo = getOr<IAuthState['user']['userInfo']>(`user.userInfo`, null)
export const getUserAccessToken = get<IAuthState['user']['accessToken']>(`user.accessToken`)

export const getAuthorizationHeader = state => {
  const authState = getRootAuthState(state)
  const { user } = authState
  if (!user) return null
  return {
    headers: {
      authorization: `Bearer ${user.accessToken}`,
    },
  }
}
