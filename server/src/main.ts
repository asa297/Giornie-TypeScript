import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as http from 'http'

// import { googleCredential } from 'config/google'
import { serverInitialEnvironment } from 'config/server'

// import * as admin from 'firebase-admin'
// import * as mongoose from 'mongoose'
require('dotenv').config()
// import { databaseCredential } from 'config/database'

const app = express()
const server = http.createServer(app)

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// admin.initializeApp({
//   credential: admin.credential.cert(googleCredential),
//   databaseURL: 'https://e-learning-swu.firebaseio.com',
// })

// mongoose
//   .connect(databaseCredential.MONGO_URL, {
//     useNewUrlParser: true,
//     user: databaseCredential.MONGO_USERNAME,
//     pass: databaseCredential.MONGO_PASSWORD,
//     autoReconnect: true,
//     reconnectTries: 30,
//     reconnectInterval: 1000,
//   })
//   .then(() => {
//     console.log('connect db')
//   })
//   .catch(() => {
//     console.log('fail connect db')
//     process.exit()
//   })

require('models/index')
require('modules/module')(app)

server.listen(serverInitialEnvironment.PORT, () => {
  console.log(`> Ready on PORT ${serverInitialEnvironment.PORT}`)
})
