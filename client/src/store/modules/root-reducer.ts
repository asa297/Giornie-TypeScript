import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'

import authModuleReducer from '@app/store/modules/auth/reducer'
import { MODULE_NAME as AUTH_MODULE } from '@app/store/modules/auth/type'
import organizationModuleReducer from '@app/store/modules/organization/reducer'
import { MODULE_NAME as ORGANIZATION_MODULE } from '@app/store/modules/organization/type'
import groupModuleReducer from '@app/store/modules/group/reducer'
import { MODULE_NAME as GROUP_MODULE } from '@app/store/modules/group/type'

export const rootReducer = combineReducers({
  [AUTH_MODULE]: authModuleReducer,
  [ORGANIZATION_MODULE]: organizationModuleReducer,
  [GROUP_MODULE]: groupModuleReducer,
  routing: routerReducer,
})
