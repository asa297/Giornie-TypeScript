import { fromJS } from 'immutable'

import { AuthState } from '@app/store/modules/auth/reducer'
import { MODULE_NAME } from '@app/store/modules/auth/type'
import { get } from '@app/store/modules/helpers/ramda'

export const getRootAuthState = state => state.getIn([MODULE_NAME], fromJS({})).toJS() as AuthState
export const getAuthIsLoading = get<AuthState['isLoading']>(`isLoading`)
export const getAuthError = get<AuthState['error']>('error')
export const getAuthErrorText = (errorKey: string) => get<AuthState['error']>(`error.${errorKey}`)
export const getAuthIsAuthenticated = get<AuthState['isAuthenticated']>(`isAuthenticated`)
export const getAuthIsInitializing = get<AuthState['isInitializing']>(`isInitializing`)

export const getUser = get<AuthState['user']>(`user`)
export const getUserInfo = get<AuthState['user']['userInfo']>(`user.userInfo`)
export const getUserAccessToken = get<AuthState['user']['accessToken']>(`user.accessToken`)
