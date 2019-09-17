import * as admin from 'firebase-admin'
import * as HttpStatus from 'http-status-codes'

export const AuthGuard = (req, res, next) => {
  const authorizationReq = req.headers['authorization']
  if (!authorizationReq) return res.status(HttpStatus.UNAUTHORIZED).send('Not Authorized')

  const token = authorizationReq.replace('Bearer ', '')
  admin
    .auth()
    .verifyIdToken(token)
    .then(user => {
      req.user = user
      next()
    })
    .catch(error => {
      res.status(HttpStatus.UNAUTHORIZED).send(error)
    })
}
