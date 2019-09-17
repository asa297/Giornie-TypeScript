import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as http from 'http'
// import { googleCredential } from '@config/google-credential'
import { serverInitialEnvironment } from '@config/server'

const app = express()
const server = http.createServer(app)

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('dotenv').config()
require('@modules/module')(app)

server.listen(serverInitialEnvironment.PORT, () => {
  console.log(`> Ready on PORT ${serverInitialEnvironment.PORT}`)
})
