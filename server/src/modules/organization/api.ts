import { Response } from 'express'
import * as HttpStatus from 'http-status-codes'

import { AuthGuard, RequestWithUser } from 'middleware/auth/auth-guard'
import { RoleGuard, UserRoleEnum } from 'middleware/auth/role-guard'
import { OrganizationModel } from 'models/organization/organization-model'

module.exports = app => {
  app.get('/api/org/getOrg', AuthGuard, RoleGuard([UserRoleEnum.ADMIN]), async (req: RequestWithUser, res: Response) => {
    try {
      const organations = await OrganizationModel.find()
      res.send(organations)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  })

  app.post('/api/org/createOrg', AuthGuard, RoleGuard([UserRoleEnum.ADMIN]), async (req: RequestWithUser, res: Response) => {
    try {
      res.send('organations')
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  })
}
