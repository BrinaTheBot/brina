const mongoose = require('mongoose')

const guildSchema = new mongoose.Schema(
  {
    guildId: { type: String },
    guildName: { type: String },
    guildMemberCount: { type: Number },
    guildPresenceCount: { type: Number },
    guildOwnerId: { type: String },
    guildLang: { type: String },
    guildNsfwFilter: { type: String },
    guildBotLang: { type: String },
    createdAt: { type: String, default: new Date() },
    deletedAt: { type: String, default: null },
    active: { type: Boolean, default: true }
  },
  { collection: 'guilds' }
)

module.exports = mongoose.model('guild', guildSchema)
