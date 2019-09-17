import * as mongoose from 'mongoose'

import * as admin from 'firebase-admin'
import * as moment from 'moment'

import { UserModel } from '@server/models/user/user-model'

module.exports = app => {
  const user = UserModel.findOne({}, (err, user) => {
    return user.username === '5'
  })
  console.log('test1')
}
