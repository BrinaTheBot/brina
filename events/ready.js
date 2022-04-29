const Client = require('../index').Client
const { createCmd, globalCmd } = require('../dataHandler')

Client.on('ready', () => {
    Client.user.setPresence({ activities: [{ name: 'e transcrevendo', type: 'LISTENING'}] })
    console.log(`${Client.user.tag} is online! 🟢`)

    globalCmd(Client)
    createCmd(Client, '965665762637389825')
})