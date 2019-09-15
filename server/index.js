const http = require('http')
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const SocketIO = require('socket.io')
const config = require('../nuxt.config.js')
const api = require('./routes/api')

const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'
const app = express()
const server = http.createServer(app)
const io = SocketIO(server)

// We instantiate Nuxt.js with the options
config.dev = !isProd

const nuxt = new Nuxt(config)
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use('/api', api)
app.use(nuxt.render)

// Listen the server
server.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port) // eslint-disable-line no-console

// Socket.io
io.on('connection', (socket) => {
  consola.log('IO socket start')
  socket.broadcast.emit('status', { pwet: 'toto' })
  setInterval(function () {
    socket.broadcast.emit('status', { pwet: 'titi' })
  }, 1000)
})