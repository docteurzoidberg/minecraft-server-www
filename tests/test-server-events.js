/* eslint-disable no-console */
const servevents = require('../server/lib/serverevents')

servevents.on('error', function (err) {
  console.error(err)
})

servevents.on('serverstart', function () {
  console.log('server started')
})

servevents.on('serverstop', function () {
  console.log('server stopped')
})

servevents.on('playerlogin', function (player) {
  console.log('player ' + player.name + 'logged in !')
})

servevents.on('playerlogout', function (player) {
  console.log('player ' + player.name + 'logged out !')
})

servevents.start(1000)
