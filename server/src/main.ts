import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as http from 'http'
import * as aws from 'aws-sdk'
import * as socket from 'socket.io'

import { serverInitialEnvironment } from 'config/server'
import { initialFirebaseAdmin } from 'services/firebase'
import { initialDatabase } from 'services/database'

require('dotenv').config()

const app = express()
const server = http.createServer(app)
const io = socket(server)

const serverCred = serverInitialEnvironment()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

initialFirebaseAdmin()
initialDatabase()

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_S3_REGION,
})

require('models/index')
require('modules/module')(app)
require('services/socket')(io)

server.listen(serverCred.PORT, () => {
  console.log(`> Ready on PORT ${serverCred.PORT}`)
})
