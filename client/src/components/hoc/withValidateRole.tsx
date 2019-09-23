import React from 'react'
import * as R from 'ramda'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getRootAuthState, getUserInfo } from '@app/store/modules/auth/selector'

export const withValidateRole = Component => {
  return () => {
    const user = useSelector(
      R.compose(
        getUserInfo,
        getRootAuthState,
      ),
    )

    if (!user) return <Redirect to="/login" />
    return <Component />
  }
}
