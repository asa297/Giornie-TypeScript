import { Response } from 'express'
import * as HttpStatus from 'http-status-codes'

import { AuthGuard, RequestWithUser } from 'middleware/auth/auth-guard'
import { RoleGuard, UserRoleEnum } from 'middleware/auth/role-guard'
import { OrganizationModel, IOrganizationBody } from 'models/organization/organization-model'

module.exports = app => {
  app.get('/api/org/loadOrg', AuthGuard, RoleGuard([UserRoleEnum.ADMIN]), async (req: RequestWithUser, res: Response) => {
    try {
      const organations = await OrganizationModel.find(
        {},
        { record_id_by: 0, record_name_by: 0, record_date: 0, last_modify_by_id: 0, last_modify_by_name: 0 },
      )
      res.send(organations)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  })

  app.get(
    '/api/org/loadOrgSelection',
    AuthGuard,
    RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
    async (req: RequestWithUser, res: Response) => {
      try {
        const organations = await OrganizationModel.find({}, { _id: 1, org_name: 1, org_code: 1 })
        res.send(organations)
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).send(error.message)
      }
    },
  )

  app.post('/api/org/createOrg', AuthGuard, RoleGuard([UserRoleEnum.ADMIN]), async (req: RequestWithUser, res: Response) => {
    try {
      const { body, user } = req

      const found = await OrganizationModel.find().then(model => model.find(value => value.org_code === body.orgCode))

      if (found) throw 'รหัสบริษัทซํ้า'

      const data: IOrganizationBody = {
        org_type_id: body.orgType.id,
        org_type_name: body.orgType.label,
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

      res.send()
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error)
    }
  })

  app.get('/api/org/getOrg/:docId', AuthGuard, RoleGuard([UserRoleEnum.ADMIN]), async (req: RequestWithUser, res: Response) => {
    try {
      const { docId } = req.params
      const organation = await OrganizationModel.find(
        {},
        { record_id_by: 0, record_name_by: 0, record_date: 0, last_modify_by_id: 0, last_modify_by_name: 0 },
      ).then(model => model.find(value => value._id.toString() === docId))

      if (!organation) res.status(HttpStatus.BAD_REQUEST).send('ไม่พบเอกสาร')

      res.send(organation)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  })

  app.put('/api/org/updateOrg/:docId', AuthGuard, RoleGuard([UserRoleEnum.ADMIN]), async (req: RequestWithUser, res: Response) => {
    try {
      const { docId } = req.params
      const { body, user } = req

      await OrganizationModel.updateOne(
        { _id: docId },
        {
          $set: {
            org_type_id: body.orgType.id,
            org_type_name: body.orgType.label,
            org_name: body.orgName,
            org_com_A: body.orgComA,
            org_com_B: body.orgComB,
            org_code: body.orgCode,
            last_modify_by_id: user._id,
            last_modify_by_name: user.name,
            last_modify_date: new Date(),
          },
        },
      ).exec()

      res.send()
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  })

  app.delete('/api/org/deleteOrg/:docId', AuthGuard, RoleGuard([UserRoleEnum.ADMIN]), async (req: RequestWithUser, res: Response) => {
    try {
      const { docId } = req.params

      await OrganizationModel.findByIdAndDelete(docId)

      res.send()
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  })
}
