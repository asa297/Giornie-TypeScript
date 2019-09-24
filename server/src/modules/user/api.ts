import { Response } from 'express'
import * as HttpStatus from 'http-status-codes'

import { AuthGuard, RequestWithUser } from 'middleware/auth/auth-guard'

module.exports = app => {
  app.get('/api/user/userInfo', AuthGuard, (req: RequestWithUser, res: Response) => {
    try {
      const { user } = req
      res.send(user)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  })
}
