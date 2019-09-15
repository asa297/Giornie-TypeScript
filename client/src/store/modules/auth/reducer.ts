import { fromJS } from 'immutable'

import { actionTypes } from './type'

export interface AuthState {
  isLoading: boolean
  error?: any
}

const initState: AuthState = {
  isLoading: false,
}

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actionTypes.IS_LOADING:
      return state.setIn(['isLoading'], fromJS(action.payload))
    case actionTypes.ERROR:
      return state.setIn(['error'], fromJS(action.payload))
    default:
      return state
  }
}
