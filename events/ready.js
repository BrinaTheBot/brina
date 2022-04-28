const Client = require('../index').Client
const { createCmd } = require('../dataHandler')

Client.on('ready', () => {
    Client.user.setPresence({ activities: [{ name: 'Astronautas', type: 'WATCHING'}] })
    console.log(`${Client.user.tag} is online! 🟢`)

    createCmd(Client, '965665762637389825')
})