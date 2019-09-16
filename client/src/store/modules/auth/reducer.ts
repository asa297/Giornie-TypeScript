import { fromJS } from 'immutable'

import { actionTypes } from '@app/store/modules/auth/type'

export interface UserInfo {
  userInfo: firebase.User
  accessToken: string
}

export interface AuthState {
  isLoading: boolean
  isAuthenticated: boolean
  isInitializing: boolean
  error?: {
    [key: string]: {
      message: string
    }
  }
  user?: UserInfo
}

const initState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  isInitializing: false,
  user: null,
}

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actionTypes.INITIAL_AUTH:
      return state.mergeDeep({
        isAuthenticated: false,
        isInitializing: true,
        userInfo: null,
      })
    case actionTypes.SET_INITIAL_AUTH_STATUS:
      return state.mergeDeep({
        isAuthenticated: action.payload.isAuthenticated,
        isInitializing: action.payload.isInitializing,
      })
    case actionTypes.SET_USER_INFO:
      return state.setIn(['user'], fromJS(action.payload.userInfo))
    case actionTypes.IS_LOADING:
      return state.setIn(['isLoading'], fromJS(action.payload.isLoading))
    case actionTypes.SET_AUTH_MODULE_ERROR:
      return state.updateIn(['error'], (errorState: any) => {
        const newItemsJS = errorState.toJS()

        const { key, error } = action.payload

        if (error) newItemsJS[key] = error
        else delete newItemsJS[key]

        return fromJS({ ...newItemsJS })
      })
    default:
      return state
  }
}
