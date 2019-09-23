import * as admin from 'firebase-admin'
import * as HttpStatus from 'http-status-codes'
import { Request, Response } from 'express'

import { UserModel } from 'models/user/user-model'
import { IUser } from 'models/user/user-model'

export interface RequestWithUser extends Request {
  user?: IUser
}

export const AuthGuard = (req: RequestWithUser, res, next) => {
  const authorizationReq = req.headers['authorization']
  if (!authorizationReq) return res.status(HttpStatus.UNAUTHORIZED).send('Not Authorized')

  const token = authorizationReq.replace('Bearer ', '')
  admin
    .auth()
    .verifyIdToken(token)
    .then(async (user: any) => {
      user = await UserModel.find().then(model => model.find(value => value.email === 'makejack4@gmail.com'))
      if (!user) throw new Error('User not found')
      req.user = user
      next()
    })
    .catch(error => {
      res.status(HttpStatus.UNAUTHORIZED).send(error.message)
    })
}
