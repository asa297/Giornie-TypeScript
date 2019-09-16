import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'

import authModuleReducer from '@app/store/modules/auth/reducer'
import { MODULE_NAME as AUTH_MODULE } from '@app/store/modules/auth/type'

export const rootReducer = combineReducers({
  [AUTH_MODULE]: authModuleReducer,
  routing: routerReducer,
})
