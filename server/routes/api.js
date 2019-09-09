const express = require('express')
const apicache = require('apicache')
const mcserver = require('../lib/minecraft-server')

const router = express.Router()
const cache = apicache.middleware

router.get('/status', cache('10 seconds'), function (req, res, next) {
  mcserver.getStatus(function (err, data) {
    if (err) {
      return res.status(500).json(err)
    }
    res.json(data)
  })
})

module.exports = router
