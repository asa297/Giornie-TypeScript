import React from 'react'
import * as R from 'ramda'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getRootAuthState, getUserInfo } from '@app/store/modules/auth/selector'
import { UserRoleEnum } from '@app/store/modules/auth/reducer'

export interface UserRoleProps {
  userRole: UserRoleEnum
}

export const withValidateRole = (permisstionRole: Array<UserRoleEnum>) => Component => {
  return props => {
    const user = useSelector(
      R.compose(
        getUserInfo,
        getRootAuthState,
      ),
    )

    const userRole = permisstionRole.find(role => user.role === role)

    if (!user) return <Redirect to="/login" />
    if (!userRole) return <Redirect to="/" />
    return <Component {...props} userRole={userRole} />
  }
}
