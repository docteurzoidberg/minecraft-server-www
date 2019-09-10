#!/usr/bin/env node

const discord = require('discord.js')

const config = require('../config/discord-credentials') // not on github :)
const events = require('./serverevents')

const discordhook = new discord.WebhookClient(config.id, config.token)

events.on('error', function (err) {
  console.error(err)
})

events.on('serverstart', function () {
  console.log('Server started')
  discordhook.sendMessage(`Server is **UP** 🎆 : GOGOGO players GO 😃`, {
    'embeds': [{
      'image': {
        'url': 'https://i.imgur.com/6TIuHt4.png'
      }
    }]
  })
})

events.on('serverstop', function () {
  console.log('Server stopped')
  discordhook.sendMessage(`Server is **DOWN** 🔴 : stopped for maintenance 😢`, {
    'embeds': [{
      'image': {
        'url': 'https://i.imgur.com/6TIuHt4.png'
      }
    }]
  })
})

events.on('playerlogin', function (player) {
  console.log('Player ' + player.name + ' joined')
  discordhook.sendMessage('', {
    'embeds': [{
      'title': `**${player.name}** joined the server !`,
      'image': {
        'url': `https://minotar.net/bust/${player.name}/100.png`
      }
    }]
  })
})

events.on('playerlogout', function (player) {
  console.log('Player ' + player.name + ' left')
  discordhook.sendMessage('', {
    'embeds': [{
      'title': `**${player.name}** left the server`,
      'image': {
        'url': `https://minotar.net/bust/${player.name}/100.png`
      }
    }]
  })
})

module.exports = function () {
  console.log('Discord bot started')
  events.start(5000)
}
