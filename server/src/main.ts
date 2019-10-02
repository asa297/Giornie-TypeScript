import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as http from 'http'

import { serverInitialEnvironment } from 'config/server'
import { initialFirebaseAdmin } from 'services/firebase'
import { initialDatabase } from 'services/database'
// import { initialAWS } from 'services/upload-file'

require('dotenv').config()

const app = express()
const server = http.createServer(app)

const serverCred = serverInitialEnvironment()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

initialFirebaseAdmin()
initialDatabase()
// initialAWS()

require('models/index')
require('modules/module')(app)

server.listen(serverCred.PORT, () => {
  console.log(`> Ready on PORT ${serverCred.PORT}`)
})
