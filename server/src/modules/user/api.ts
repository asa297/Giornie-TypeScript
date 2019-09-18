import * as HttpStatus from 'http-status-codes'

import { UserModel } from 'models/user/user-model'
import { AuthGuard } from 'middleware/auth/auth-guard'

module.exports = app => {
  app.get('/api/user', AuthGuard, async (req, res) => {
    try {
      const user = await UserModel.findOne({}, (err, user) => {
        return user.email === req.user
      })

      if (!user) throw new Error('User not found')

      res.send(user)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error)
    }
  })

  app.get('/api/test', async (req, res) => {
    try {
      res.send('user')
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error)
    }
  })
}
