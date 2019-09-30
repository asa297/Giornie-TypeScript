import { Response } from 'express'
import * as HttpStatus from 'http-status-codes'

import { AuthGuard, RequestWithUser } from 'middleware/auth/auth-guard'
import { RoleGuard, UserRoleEnum } from 'middleware/auth/role-guard'
import { GroupModel, IGroupBody } from 'models/group/group-model'
import { OrganizationModel } from 'models/organization/organization-model'

module.exports = app => {
  app.get('/api/group/loadGroup', AuthGuard, RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]), async (req: RequestWithUser, res: Response) => {
    try {
      const groups = await GroupModel.find({}, { record_id_by: 0, record_name_by: 0, record_date: 0, last_modify_by_id: 0, last_modify_by_name: 0 })
      res.send(groups)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  })

  app.post(
    '/api/group/createGroup',
    AuthGuard,
    RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
    async (req: RequestWithUser, res: Response) => {
      try {
        const { body, user } = req

        const found = await GroupModel.find().then(model => model.find(value => value.group_code === body.groupCode))

        if (found) throw 'รหัสกรุ๊ปซํ้า'

        const organation = await OrganizationModel.find(
          {},
          { record_id_by: 0, record_name_by: 0, record_date: 0, last_modify_by_id: 0, last_modify_by_name: 0 },
        ).then(model => model.find(value => value._id.toString() === body.org.id))

        if (!organation) throw 'ไม่พบเอกสารรายการบริษัท'

        const data: IGroupBody = {
          group_code: body.groupCode,
          group_sticker_number: body.groupStickerNumber,
          org: {
            id: organation._id,
            name: organation.org_name,
            type_id: organation.org_type_id,
            type_name: organation.org_type_name,
            code: organation.org_code,
          },
          guide_name: body.guideName,
          group_remark: body.groupRemark,
          record_id_by: user._id,
          record_name_by: user.name,
          record_date: new Date(),
          last_modify_by_id: user._id,
          last_modify_by_name: user.name,
          last_modify_date: new Date(),
        }

        await new GroupModel(data).save()

        res.send()
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).send(error)
      }
    },
  )

  app.get(
    '/api/group/getGroup/:docId',
    AuthGuard,
    RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
    async (req: RequestWithUser, res: Response) => {
      try {
        const { docId } = req.params
        const group = await GroupModel.find(
          {},
          { record_id_by: 0, record_name_by: 0, record_date: 0, last_modify_by_id: 0, last_modify_by_name: 0 },
        ).then(model => model.find(value => value._id.toString() === docId))

        if (!group) res.status(HttpStatus.BAD_REQUEST).send('ไม่พบเอกสาร')

        res.send(group)
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).send(error.message)
      }
    },
  )

  app.put(
    '/api/group/updateGroup/:docId',
    AuthGuard,
    RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
    async (req: RequestWithUser, res: Response) => {
      try {
        const { docId } = req.params
        const { body, user } = req

        const organation = await OrganizationModel.find(
          {},
          { record_id_by: 0, record_name_by: 0, record_date: 0, last_modify_by_id: 0, last_modify_by_name: 0 },
        ).then(model => model.find(value => value._id.toString() === body.org.id))

        if (!organation) throw 'ไม่พบเอกสารรายการบริษัท'

        await GroupModel.updateOne(
          { _id: docId },
          {
            $set: {
              group_code: body.groupCode,
              group_sticker_number: body.groupStickerNumber,
              org: {
                id: organation._id,
                name: organation.org_name,
                type_id: organation.org_type_id,
                type_name: organation.org_type_name,
                code: organation.org_code,
              },
              guide_name: body.guideName,
              group_remark: body.groupRemark,
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
    },
  )

  app.delete(
    '/api/group/deleteGroup/:docId',
    AuthGuard,
    RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
    async (req: RequestWithUser, res: Response) => {
      try {
        const { docId } = req.params

        await GroupModel.findByIdAndDelete(docId)

        res.send()
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).send(error.message)
      }
    },
  )
}
