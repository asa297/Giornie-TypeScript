import * as mongoose from 'mongoose'

import * as admin from 'firebase-admin'
import * as moment from 'moment'

import { UserModel } from 'models/user/user-model'
import { AuthToken } from 'middleware/auth/auth-guard'

module.exports = app => {
  const user = UserModel.findOne({}, (err, user) => {
    return user.email === '5'
  })
  console.log('test1')
}
