import { fromJS } from 'immutable'

import { IItemState } from '@app/store/modules/item/reducer'
import { MODULE_NAME } from '@app/store/modules/item/type'
import { get } from '@app/store/modules/helpers/ramda'

export const getRootItemState = state => state.getIn([MODULE_NAME], fromJS({})).toJS() as IItemState
export const getItemIsLoading = get<IItemState['isLoading']>(`isLoading`)
export const getItemError = get<IItemState['error']>('error')
export const getItemErrorText = (errorKey: string) => get<IItemState['error']>(`error.${errorKey}`)

export const getItemList = get<IItemState['data']['list']>(`data.list`)
export const getItemListById = (docId: string) => get<IItemState['data']['list']['']>(`data.list.${docId}`)
export const getPurchaseOrderItemList = get<IItemState['data']['purchaseOrderItems']>(`data.purchaseOrderItems`)
export const getPurchaseOrderListById = (docId: string) => get<IItemState['data']['purchaseOrderItems']['']>(`data.purchaseOrderItems.${docId}`)
