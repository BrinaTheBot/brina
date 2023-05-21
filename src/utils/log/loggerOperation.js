const Log = require('../../models/log')

async function loggerOperation(inter, command) {
  try {
    const newLog = new Log({
      guild: {},
      command: {
        commandName: command,
        interactionId: inter.id
      },
      triggeredBy: {
        userName: inter.user.username,
        userId: inter.user.id
      },
      channel: inter.channel.id
    })

    newLog.save()
  } catch (error) {
    console.log(error)
  }
}

module.exports = loggerOperation
