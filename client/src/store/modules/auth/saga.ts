import { put, takeLeading } from 'redux-saga/effects'
import { actionTypes } from '@store/modules/auth/type'
import { push } from 'react-router-redux'
import { login, logout } from './action'

function* loginTask(action: ReturnType<typeof login>) {
  try {
    yield put({ type: actionTypes.IS_LOADING, payload: true })

    // const { email, password } = action.payload
    // yield auth.signInWithEmailAndPassword(email, password)
    yield put(push(`/course`))
  } catch (e) {
    yield put({ type: actionTypes.ERROR, payload: e.message })
  } finally {
    yield put({ type: actionTypes.IS_LOADING, payload: false })
  }
}

function* logoutTask(action: ReturnType<typeof logout>) {
  try {
    yield put({ type: actionTypes.IS_LOADING, payload: true })
    // yield auth.signOut()
  } catch (e) {
    yield put({ type: actionTypes.ERROR, payload: e.message })
  } finally {
    yield put({ type: actionTypes.IS_LOADING, payload: false })
  }
}

export default [takeLeading(actionTypes.LOGIN, loginTask), takeLeading(actionTypes.LOGOUT, logoutTask)]
