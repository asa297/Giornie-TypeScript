import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'

import authModuleReducer from './auth/reducer'
import { MODULE_NAME as AUTH_MODULE } from './auth/type'

export const rootReducer = combineReducers({
  [AUTH_MODULE]: authModuleReducer,
  routing: routerReducer,
})
