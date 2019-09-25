import { Response } from 'express'
import * as HttpStatus from 'http-status-codes'

import { AuthGuard, RequestWithUser } from 'middleware/auth/auth-guard'
import { RoleGuard, UserRoleEnum } from 'middleware/auth/role-guard'
import { OrganizationModel, IOrganizationBody } from 'models/organization/organization-model'

module.exports = app => {
  app.get('/api/org/getOrg', AuthGuard, RoleGuard([UserRoleEnum.ADMIN]), async (req: RequestWithUser, res: Response) => {
    try {
      const organations = await OrganizationModel.find().then(model => model.find(value => value))
      res.send(organations)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  })

  app.post('/api/org/createOrg', AuthGuard, RoleGuard([UserRoleEnum.ADMIN]), async (req: RequestWithUser, res: Response) => {
    try {
      const { body, user } = req

      const found = await OrganizationModel.find().then(model => model.find(value => value.org_code === body.orgCode))

      if (found) return res.status(HttpStatus.BAD_REQUEST).send('Organization Code is Duplicate.')

      const data: IOrganizationBody = {
        org_type_id: body.orgType.id,
        org_type_name: body.orgType.id,
        org_name: body.orgName,
        org_com_A: body.orgComA,
        org_com_B: body.orgComB,
        org_code: body.orgCode,
        record_id_by: user._id,
        record_name_by: user.name,
        record_date: new Date(),
        last_modify_by_id: user._id,
        last_modify_by_name: user.name,
        last_modify_date: new Date(),
      }

      await new OrganizationModel(data).save()
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  })
}
