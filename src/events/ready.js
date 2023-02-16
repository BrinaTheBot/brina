const Client = require('../../index').Client
const { ActivityType } = require('discord.js')
const { createCmd, globalCmd } = require('../dataHandler')

Client.on('ready', () => {
    Client.user.setPresence({
        activities: [{name: 'e transcrevendo', type: ActivityType.Listening}],
        status: 'online'
    })
    console.log(`${Client.user.tag} is online! 🟢`)

    globalCmd(Client)
    createCmd(Client, '965665762637389825')
})