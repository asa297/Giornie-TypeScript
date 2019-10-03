import { Response } from 'express'
import * as HttpStatus from 'http-status-codes'

import { AuthGuard, RequestWithUserAndUploadFile } from 'middleware/auth/auth-guard'
import { UploadImageS3 } from 'services/aws'

const UploadFileSingle = UploadImageS3.single('item_file')

module.exports = app => {
  app.post('/api/upload', AuthGuard, UploadFileSingle, (req: RequestWithUserAndUploadFile, res: Response) => {
    try {
      const { file } = req
      res.send(file)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  })
}
