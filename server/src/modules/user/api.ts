import { Request, Response } from 'express'
import * as HttpStatus from 'http-status-codes'
import { Schema } from 'mongoose'

import { UserModel } from 'models/user/user-model'
import { AuthGuard, RequestWithUser } from 'middleware/auth/auth-guard'

module.exports = app => {
  app.get('/api/userInfo', AuthGuard, async (req: RequestWithUser, res: Response) => {
    try {
      const { user } = req
      res.send(user)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  })
}
