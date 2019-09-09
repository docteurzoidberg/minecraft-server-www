const crypto = require('crypto')
const fs = require('fs')
const mcping = require('mc-ping-updated')

const MinecraftServer = {}

const serverconfig = require('../config/server-config')

MinecraftServer.getStatus = function (callback) {
  mcping(serverconfig.ip, serverconfig.port, function (err, data) {
    if (err) {
      return callback(err)
    }
    return callback(null, data)
  })
}

MinecraftServer.generateToken = function (callback) {
  const token = crypto.randomBytes(20).toString('hex')
  fs.writeFile('./tokens/' + token + '.txt', {}, function (err) {
    if (err) { return callback(err) }
    callback(null, token)
  })
}

MinecraftServer.checkToken = function (token, callback) {
  fs.stat('./tokens/' + token + '.txt', function (err) {
    if (err) { return callback(new Error('Invalid token provided')) }
    callback(null)
  })
}

MinecraftServer.startServer = function (token, callback) {
  return callback(new Error('start not implemented'))
}

MinecraftServer.stopServer = function (callback) {
  return callback(new Error('stop not implemented'))
}

module.exports = MinecraftServer
