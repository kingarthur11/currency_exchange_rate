const express = require('express');
const http = require('http')
const cors = require("cors")
const api = require("./api");

const app = express()
app.use(cors())
app.use('/', api)



const server = http.createServer(app)

const port = process.env.PORT || 9000
server.listen(port)




