import React from 'react'
import * as R from 'ramda'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getRootAuthState, getUserInfo } from '@app/store/modules/auth/selector'

export const withNoAuth = Component => {
  return props => {
    const user = useSelector(
      R.compose(
        getUserInfo,
        getRootAuthState,
      ),
    )

    if (user) return <Redirect to="/" />
    return <Component {...props} />
  }
}
