import firebase from 'firebase/app'
import 'firebase/auth'
import { put, takeLeading, take, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { push } from 'react-router-redux'
import axios from 'axios'

import { actionTypes } from '@app/store/modules/auth/type'
import {
  login,
  logout,
  initialAuth,
  setInitialAuth,
  setUserInfo,
  setAuthModuleError,
  setIsLoading,
} from '@app/store/modules/auth/action'
import { getAuthorizationHeader } from '@app/store/modules/auth/selector'

function* initialAuthTask(action: ReturnType<typeof initialAuth>) {
  const authChannel = eventChannel(emit => {
    return firebase.auth().onAuthStateChanged(user => {
      emit({ user })
    })
  })

  while (true) {
    const result = yield take(authChannel)

    try {
      if (result.user) {
        const firebaseUser = result.user as firebase.User

        const idToken = yield firebaseUser.getIdToken()

        yield put(setUserInfo({ userInfo: null, accessToken: idToken }))

        const config = yield select(getAuthorizationHeader)

        const { data } = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user/userInfo`, config)

        yield put(setUserInfo({ userInfo: data, accessToken: idToken }))
      } else {
        yield put(setUserInfo({ userInfo: null }))
      }
    } catch (error) {
      yield put(setAuthModuleError('initialAuth', error))
    } finally {
      yield put(setInitialAuth(true, false))
    }
  }
}

function* loginTask(action: ReturnType<typeof login>) {
  try {
    yield put(setIsLoading(true))
    yield put(setAuthModuleError('login'))
    const { email, password } = action.payload
    yield firebase.auth().signInWithEmailAndPassword(email, password)
    yield put(push(`/`))
  } catch (error) {
    yield put(setAuthModuleError('login', 'การเข้าสู่ระบบไม่สำเร็จ'))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* logoutTask(action: ReturnType<typeof logout>) {
  try {
    yield put(setIsLoading(true))
    yield firebase.auth().signOut()
    yield put(push(`/`))
  } catch (error) {
    yield put(setAuthModuleError('logout', error))
  } finally {
    yield put(setIsLoading(false))
  }
}

export default [
  takeLeading(actionTypes.INITIAL_AUTH, initialAuthTask),
  takeLeading(actionTypes.LOGIN, loginTask),
  takeLeading(actionTypes.LOGOUT, logoutTask),
]
