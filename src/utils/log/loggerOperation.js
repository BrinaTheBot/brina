const Log = require('../../models/log')

async function loggerOperation(inter) {
  try {
    const newLog = new Log({
      guild: {
        guildId: inter.guildId,
        channelId: inter.channelId
      },
      command: {
        commandName: inter.commandName,
        commandId: inter.commandId
      },
      user: {
        userName: inter.user.username + '#' + inter.user.discriminator,
        userId: inter.user.id
      }
    })

    await newLog.save()
  } catch (error) {
    console.log(error)
  }
}

module.exports = loggerOperation
