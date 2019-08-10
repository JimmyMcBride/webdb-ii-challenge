const express = require('express')
const helmet = require('helmet')

const server = express()

server.use(helmet())
server.use(express.json())

// Endpoints go here ☠️

module.exports = server