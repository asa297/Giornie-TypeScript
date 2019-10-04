import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'

import authModuleReducer from '@app/store/modules/auth/reducer'
import { MODULE_NAME as AUTH_MODULE } from '@app/store/modules/auth/type'
import organizationModuleReducer from '@app/store/modules/organization/reducer'
import { MODULE_NAME as ORGANIZATION_MODULE } from '@app/store/modules/organization/type'
import groupModuleReducer from '@app/store/modules/group/reducer'
import { MODULE_NAME as GROUP_MODULE } from '@app/store/modules/group/type'
import sellerModuleReducer from '@app/store/modules/seller/reducer'
import { MODULE_NAME as SELLER_MODULE } from '@app/store/modules/seller/type'
import itemModuleReducer from '@app/store/modules/item/reducer'
import { MODULE_NAME as ITEM_MODULE } from '@app/store/modules/item/type'
import purchaseOrderModuleReducer from '@app/store/modules/purchase-order/reducer'
import { MODULE_NAME as PURCHASE_ORDER_MODULE } from '@app/store/modules/purchase-order/type'

export const rootReducer = combineReducers({
  [AUTH_MODULE]: authModuleReducer,
  [ORGANIZATION_MODULE]: organizationModuleReducer,
  [GROUP_MODULE]: groupModuleReducer,
  [SELLER_MODULE]: sellerModuleReducer,
  [ITEM_MODULE]: itemModuleReducer,
  [PURCHASE_ORDER_MODULE]: purchaseOrderModuleReducer,
  routing: routerReducer,
})
