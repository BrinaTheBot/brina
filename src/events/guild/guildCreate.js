const Client = require('../../../index').Client
const createGuildOperation = require('../../utils/guild/createGuildOperation')

Client.on('guildCreate', async (guild) => {
  try {
    createGuildOperation(guild)
  } catch (error) {
    console.log(error)
  }
})
