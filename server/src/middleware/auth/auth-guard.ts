import * as admin from 'firebase-admin'

export const AuthToken = (req, res, next) => {
  const authorizationReq = req.headers['authorization']
  if (!authorizationReq) return res.status(401).send('Not Authorized')

  const token = authorizationReq.replace('Bearer ', '')
  admin
    .auth()
    .verifyIdToken(token)
    .then(user => {
      req.user = user
      next()
    })
    .catch(error => {
      res.status(401).send(error)
    })
}
