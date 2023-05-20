const Client = require('../../index').Client
const { ActivityType } = require('discord.js')
require('dotenv').config()

const { createCmd, globalCmd } = require('../dataHandler')

Client.on('ready', () => {
  Client.user.setPresence({
    activities: [{ name: 'e transcrevendo', type: ActivityType.Listening }],
    status: 'online'
  })
  console.log(`${Client.user.tag} is online! 🟢`)

  globalCmd(Client)
  createCmd(Client, process.env.SUPPORT_GUILD_ID)
})
