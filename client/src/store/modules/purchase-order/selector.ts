import { fromJS } from 'immutable'

import { IPurchaseOrderState } from '@app/store/modules/purchase-order/reducer'
import { MODULE_NAME } from '@app/store/modules/purchase-order/type'
import { get } from '@app/store/modules/helpers/ramda'

export const getRootPurchaseOrderState = state => state.getIn([MODULE_NAME], fromJS({})).toJS() as IPurchaseOrderState
export const getPurchaseOrderIsLoading = get<IPurchaseOrderState['isLoading']>(`isLoading`)
export const getPurchaseOrderError = get<IPurchaseOrderState['error']>('error')
export const getPurchaseOrderErrorText = (errorKey: string) => get<IPurchaseOrderState['error']>(`error.${errorKey}`)

export const getSocketSession = get<IPurchaseOrderState['socketSession']>('socketSession')
