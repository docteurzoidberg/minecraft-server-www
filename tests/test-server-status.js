/* eslint-disable no-console */
const mcserver = require('../server/lib/minecraft-server')

mcserver.getStatus(function (err, data) {
  if (err) {
    console.error(err)
  } else {
    console.dir(data)
  }
})
