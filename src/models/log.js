const mongoose = require('mongoose')

const logSchema = new mongoose.Schema(
  {
    guild: {
      guildId: { type: String },
      channelId: { type: String }
    },
    command: {
      commandName: { type: String },
      commandId: { type: String }
    },
    user: {
      userName: { type: String },
      userId: { type: String }
    },
    date: { type: String, default: new Date() }
  },
  { collection: 'logs' }
)

module.exports = mongoose.model('log', logSchema)
