const Client = require('../../../index').Client
const deleteGuildOperation = require('../../utils/guild/deleteGuildOperation')

Client.on('guildDelete', async (guild) => {
  try {
    deleteGuildOperation(guild)
  } catch (error) {
    console.log(error)
  }
})
