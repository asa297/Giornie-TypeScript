import { Response } from 'express'
import * as HttpStatus from 'http-status-codes'

import { AuthGuard, RequestWithUser } from 'middleware/auth/auth-guard'
import { RoleGuard, UserRoleEnum } from 'middleware/auth/role-guard'
import { SellerModel, ISellerBody } from 'models/seller/seller-model'

module.exports = app => {
  app.get('/api/seller/loadSeller', AuthGuard, RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]), async (req: RequestWithUser, res: Response) => {
    try {
      const sellers = await SellerModel.find({}, { record_id_by: 0, record_name_by: 0, record_date: 0, last_modify_by_id: 0, last_modify_by_name: 0 })
      res.send(sellers)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  })

  app.post(
    '/api/seller/createSeller',
    AuthGuard,
    RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
    async (req: RequestWithUser, res: Response) => {
      try {
        const { body, user } = req

        const found = await SellerModel.find().then(model => model.find(value => value.seller_code === body.sellerCode))

        if (found) throw 'รหัสคนขายซํ้า'

        const data: ISellerBody = {
          seller_name: body.sellerName,
          seller_code: body.sellerCode,
          seller_com: body.sellerCom,
          seller_remark: body.sellerRemark,
          record_id_by: user._id,
          record_name_by: user.name,
          record_date: new Date(),
          last_modify_by_id: user._id,
          last_modify_by_name: user.name,
          last_modify_date: new Date(),
        }

        await new SellerModel(data).save()

        res.send()
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).send(error)
      }
    },
  )

  app.get(
    '/api/seller/getSeller/:docId',
    AuthGuard,
    RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
    async (req: RequestWithUser, res: Response) => {
      try {
        const { docId } = req.params
        const seller = await SellerModel.find(
          {},
          { record_id_by: 0, record_name_by: 0, record_date: 0, last_modify_by_id: 0, last_modify_by_name: 0 },
        ).then(model => model.find(value => value._id.toString() === docId))

        if (!seller) res.status(HttpStatus.BAD_REQUEST).send('ไม่พบเอกสาร')

        res.send(seller)
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).send(error.message)
      }
    },
  )

  app.put(
    '/api/seller/updateSeller/:docId',
    AuthGuard,
    RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
    async (req: RequestWithUser, res: Response) => {
      try {
        const { docId } = req.params
        const { body, user } = req

        await SellerModel.updateOne(
          { _id: docId },
          {
            $set: {
              seller_name: body.sellerName,
              seller_code: body.sellerCode,
              seller_com: body.sellerCom,
              seller_remark: body.sellerRemark,
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
    '/api/seller/deleteSeller/:docId',
    AuthGuard,
    RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
    async (req: RequestWithUser, res: Response) => {
      try {
        const { docId } = req.params

        await SellerModel.findByIdAndDelete(docId)

        res.send()
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).send(error.message)
      }
    },
  )

  app.get(
    '/api/seller/loadSellerSelection',
    AuthGuard,
    RoleGuard([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT, UserRoleEnum.STAFF]),
    async (req: RequestWithUser, res: Response) => {
      try {
        const sellers = await SellerModel.find(
          {},
          { seller_com: 0, record_id_by: 0, record_name_by: 0, record_date: 0, last_modify_by_id: 0, last_modify_by_name: 0 },
        )
        res.send(sellers)
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).send(error.message)
      }
    },
  )
}
