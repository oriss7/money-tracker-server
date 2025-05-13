const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const config = require('./config/index.js')

const app = express()

if (config.node.env !== 'production') {
  app.use(cors({credentials:true, origin: config.client.url}))
}
app.use(express.json())
app.use(cookieParser())

mongoose.connect(config.mongo.dbUrl)

require('./api/account/account.routes.js').connectAccountRoutes(app)
require('./api/transaction/transaction.routes.js').connectTransactionRoutes(app)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(4000)