import { Response } from 'express'
import * as HttpStatus from 'http-status-codes'

import { AuthGuard, RequestWithUser } from 'middleware/auth/auth-guard'
import { RoleGuard, UserRoleEnum } from 'middleware/auth/role-guard'
import { ItemModel, IItemBody } from 'models/item/item-model'
import { DeleteImageFileS3 } from 'services/aws'

module.exports = app => {
  app.get('/api/item/loadItem', AuthGuard, RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]), async (req: RequestWithUser, res: Response) => {
    try {
      const items = await ItemModel.find(
        {},
        { item_image_key: 0, record_id_by: 0, record_name_by: 0, record_date: 0, last_modify_by_id: 0, last_modify_by_name: 0 },
      )
      res.send(items)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  })

  app.post('/api/item/createItem', AuthGuard, RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]), async (req: RequestWithUser, res: Response) => {
    try {
      const { body, user } = req

      const found = await ItemModel.find().then(model => model.find(item => item.item_code === body.item_code))

      if (found) throw 'รหัสสินค้าซํ้า'

      const data: IItemBody = {
        item_type: {
          item_type_id: body.item_type.id,
          item_type_name: body.item_type.label,
        },
        item_code: body.item_code,
        item_name: body.item_name,
        item_factory: body.item_factory,
        item_color: body.item_color,
        item_skin: body.item_skin,
        item_price: body.item_price,
        item_qty_HO: 0,
        item_qty_Shop1: 0,
        item_remark: body.item_remark,
        item_image_url: body.item_image_url,
        item_image_key: body.item_image_key,

        record_id_by: user._id,
        record_name_by: user.name,
        record_date: new Date(),
        last_modify_by_id: user._id,
        last_modify_by_name: user.name,
        last_modify_date: new Date(),
      }

      await new ItemModel(data).save()

      res.send()
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error)
    }
  })

  app.get(
    '/api/item/getItem/:docId',
    AuthGuard,
    RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
    async (req: RequestWithUser, res: Response) => {
      try {
        const { docId } = req.params
        const item = await ItemModel.find(
          {},
          { record_id_by: 0, record_name_by: 0, record_date: 0, last_modify_by_id: 0, last_modify_by_name: 0 },
        ).then(model => model.find(value => value._id.toString() === docId))

        if (!item) res.status(HttpStatus.BAD_REQUEST).send('ไม่พบเอกสาร')

        res.send(item)
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).send(error.message)
      }
    },
  )

  app.put(
    '/api/item/updateItem/:docId',
    AuthGuard,
    RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
    async (req: RequestWithUser, res: Response) => {
      try {
        const { docId } = req.params
        const { body, user } = req

        await ItemModel.updateOne(
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
    },
  )

  app.delete(
    '/api/item/deleteItem/:docId',
    AuthGuard,
    RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
    async (req: RequestWithUser, res: Response) => {
      try {
        const { docId } = req.params

        const item = await ItemModel.findById(docId)

        if (item.item_image_key !== '') {
          await DeleteImageFileS3(item.item_image_key as string)
        }

        await ItemModel.findByIdAndDelete(docId)

        res.send()
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).send(error.message)
      }
    },
  )
}
