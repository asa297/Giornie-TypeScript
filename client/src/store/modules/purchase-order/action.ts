import { WAIT_FOR_ACTION, ERROR_ACTION } from 'redux-wait-for-action'

import { actionTypes } from '@app/store/modules/purchase-order/type'

export const joinSocket = () => ({
  type: actionTypes.JOIN_SOCKET,
  [WAIT_FOR_ACTION]: actionTypes.JOIN_SOCKET_SUCCESS,
  [ERROR_ACTION]: actionTypes.JOIN_SOCKET_FAILURE,
})

export const joinSocketSucess = (socketSession: SocketIOClient.Socket) => ({
  type: actionTypes.JOIN_SOCKET_SUCCESS,
  payload: {
    socketSession,
  },
})

export const joinSocketFailure = (error: any) => ({
  type: actionTypes.JOIN_SOCKET_FAILURE,
  error,
})
