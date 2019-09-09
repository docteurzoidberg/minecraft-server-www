const discord = require('discord.js')
const config = require('../server/config/discord-credentials') // not on github :)

const discordhook = new discord.WebhookClient(config.id, config.token)

discordhook.sendMessage('', {
  'embeds': [{
    'title': '**DocteurZoidberg** logged in !',
    'image': {
      'url': 'https://minotar.net/bust/DocteurZoidberg/100.png'
    }
  }]
})
