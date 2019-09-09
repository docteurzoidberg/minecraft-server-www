
/* eslint-disable prefer-const */
const events = require('events')
const mcserver = require('./minecraft-server')
const eventEmitter = new events.EventEmitter()

let lastRunning = null
let lastPlayers = null
let interval = null

function checkPlayerLoggedIn (player) {
  // 1: verifier si le player etait present le dernier coup?
  let found = false
  lastPlayers.forEach(function (lastPlayer) {
    if (lastPlayer.id === player.id) {
      // present, le joueur etait deja connecte, on ne fait rien
      // console.log(`newplayer ${player.name} deja connecte`)
      found = true
    }
  })
  if (!found) {
    // 2: il n'existait pas: event player connecte!
    eventEmitter.emit('playerlogin', player)
  }
}

function checkPlayerLoggedOut (lastplayer, newplayers) {
  // 1: verifier si le lastplayer n'est plus present
  let found = false
  newplayers.forEach(function (newplayer) {
    if (newplayer.id === lastplayer.id) {
      // present, le joueur est tjs connecte, on ne fait rien
      // console.log(`lastplayer ${newplayer.name} toujours connecte`)
      found = true
    }
  })
  if (!found) {
    eventEmitter.emit('playerlogout', lastplayer)
  }
}

function getStatus () {
  // console.dir(lastPlayers)
  mcserver.getStatus(function (err, status) {
    if (err) {
      if (err.code === 'ECONNREFUSED') {
        if (lastRunning === true) {
          eventEmitter.emit('serverstop')
          lastPlayers = null
        }
        lastRunning = false
      } else {
        eventEmitter.emit('error', err)
      }
    } else if (status) {
      if (lastRunning === false) {
        eventEmitter.emit('serverstart')
      }
      lastRunning = true
    }

    if (lastPlayers == null && status) {
      if (status.players) {
        if (Array.isArray(status.players.sample)) {
          lastPlayers = status.players.sample
          return
        }
      }
      lastPlayers = []
      return
    }

    if (!Array.isArray(lastPlayers)) {
      return
    }

    if (!status) {
      return
    }

    if (!status.players) {
      return
    }

    // Check les changement de joueurs!
    if (status.players.sample) {
      // console.log('got players!')
      // 1: on verifie chaque eventuel nouveau joueur ds la liste
      status.players.sample.map(checkPlayerLoggedIn)
    } else {
      status.players.sample = []
    }

    // 2: maintenant on verifie chaque joueur eventuellement manquant dans la liste
    lastPlayers.map(function (lastPlayer) { checkPlayerLoggedOut(lastPlayer, status.players.sample) })
    lastPlayers = status.players.sample
  })
}

eventEmitter.start = function (every = 5000) {
  interval = setInterval(getStatus, every)
}

eventEmitter.stop = function () {
  if (interval) {
    clearInterval(interval)
  }
}

module.exports = eventEmitter
