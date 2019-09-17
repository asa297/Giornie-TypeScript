import * as mongoose from 'mongoose'

import { databaseCredential } from 'config/database'

export const initialDatabase = () => {
  const databaseCred = databaseCredential()
  try {
    mongoose
      .connect(databaseCred.MONGO_URL, {
        useNewUrlParser: true,
        user: databaseCred.MONGO_USERNAME,
        pass: databaseCred.MONGO_PASSWORD,
        autoReconnect: true,
        reconnectTries: 30,
        reconnectInterval: 1000,
      })
      .then(() => {
        console.log('connect db')
      })
      .catch(() => {
        console.log('fail connect db')
        process.exit()
      })
  } catch (error) {
    return error
  }
}
