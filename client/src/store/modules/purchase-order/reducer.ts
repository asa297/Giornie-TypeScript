import { fromJS } from 'immutable'

import { actionTypes } from '@app/store/modules/purchase-order/type'

export interface IPurchaseOrderState {
  isLoading: boolean
  error?: {
    [key: string]: {
      message: string
    }
  }
  socketSession?: SocketIOClient.Socket
}

const initState: IPurchaseOrderState = {
  error: {},
  isLoading: false,
}

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actionTypes.JOIN_SOCKET:
      return state.setIn(['socketSession'], null)
    case actionTypes.JOIN_SOCKET_SUCCESS:
      return state.setIn(['socketSession'], action.payload.socketSession)
    case actionTypes.IS_LOADING:
      return state.setIn(['isLoading'], fromJS(action.payload.isLoading))
    case actionTypes.SET_PO_MODULE_ERROR:
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
