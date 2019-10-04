import { takeLeading, put, select } from 'redux-saga/effects'
import io from 'socket.io-client'
import * as R from 'ramda'

import { actionTypes } from '@app/store/modules/purchase-order/type'
import { joinSocket, joinSocketSucess, joinSocketFailure } from '@app/store/modules/purchase-order/action'
import { getRootAuthState, getUserInfo } from '@app/store/modules/auth/selector'
import { IUser } from '@app/store/modules/auth/reducer'

function* joinSocketTask(action: ReturnType<typeof joinSocket>) {
  try {
    const user: IUser = yield select(
      R.compose(
        getUserInfo,
        getRootAuthState,
      ),
    )

    const socket = io(process.env.REACT_APP_SERVER_URL, {
      transports: ['websocket'],
      query: {
        userSocket: user._id,
      },
    })

    // socket.emit('joinroom')
    // socket.emit('openpo')

    yield put(joinSocketSucess(socket))
  } catch (error) {
    yield put(joinSocketFailure(error))
  }
}

export default [takeLeading(actionTypes.JOIN_SOCKET, joinSocketTask)]
