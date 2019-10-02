import { Response } from 'express'
import * as HttpStatus from 'http-status-codes'

import { AuthGuard, RequestWithUser } from 'middleware/auth/auth-guard'
import { RoleGuard, UserRoleEnum } from 'middleware/auth/role-guard'
import { ItemModel, IItemBody } from 'models/item/item-model'
import { UploadImageS3 } from 'services/upload-file'

const UploadFileSingle = UploadImageS3.single('file')

module.exports = app => {
  app.get('/api/item/loadItem', AuthGuard, RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]), async (req: RequestWithUser, res: Response) => {
    try {
      const items = await ItemModel.find({}, { record_id_by: 0, record_name_by: 0, record_date: 0, last_modify_by_id: 0, last_modify_by_name: 0 })
      res.send(items)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  })

  app.post(
    '/api/item/createItem',
    AuthGuard,
    RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
    UploadFileSingle,
    async (req: RequestWithUser, res: Response) => {
      try {
        console.log('req.file', req.file)
        // const { body, user } = req

        // const found = await ItemModel.find().then(model => model.find(value => value.item_code === body.itemCode))

        // if (found) throw 'รหัสสินค้าซํ้า'

        //   const data: IItemBody = {

        //     record_id_by: user._id,
        //     record_name_by: user.name,
        //     record_date: new Date(),
        //     last_modify_by_id: user._id,
        //     last_modify_by_name: user.name,
        //     last_modify_date: new Date(),
        //   }

        //   await new ItemModel(data).save()

        res.send()
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).send(error)
      }
    },
  )

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

        await ItemModel.findByIdAndDelete(docId)

        res.send()
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).send(error.message)
      }
    },
  )
}
