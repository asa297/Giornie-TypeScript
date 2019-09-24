import { Response } from 'express'
import * as HttpStatus from 'http-status-codes'

import { RequestWithUser } from 'middleware/auth/auth-guard'

export enum UserRoleEnum {
  ADMIN = 1,
  ACCOUNT = 2,
  STAFF = 3,
}

export const RoleGuard = (permisstionRole?: Array<UserRoleEnum>) => (req: RequestWithUser, res: Response, next) => {
  const { user } = req
  if (!permisstionRole) next()
  if (!user) res.status(HttpStatus.UNAUTHORIZED).send('UNAUTHORIZED')
  else if (!permisstionRole.find(role => user.role === role))
    res.status(HttpStatus.UNAUTHORIZED).send('YOUR ROLE IS NOT PERMITTED')
  next()
}
