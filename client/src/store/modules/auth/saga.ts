import firebase from 'firebase/app'
import 'firebase/auth'
import { put, takeLeading, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { push } from 'react-router-redux'

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

        yield put(setUserInfo({ userInfo: firebaseUser, accessToken: idToken }))
      } else {
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

    const { email, password } = action.payload
    yield firebase.auth().signInWithEmailAndPassword(email, password)
    yield put(push(`/`))
  } catch (error) {
    yield put(setAuthModuleError('login', error))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* logoutTask(action: ReturnType<typeof logout>) {
  try {
    yield put(setIsLoading(true))
    yield firebase.auth().signOut()
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
