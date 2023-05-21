const Guild = require('../../models/guild')
const createNewGuildOperation = require('./createNewGuildOperation')
const enumLang = require('../../enums/enumLang')

async function createGuildOperation(guild) {
  try {
    const getGuild = await Guild.findOne({ guildId: guild.id })

    if (!getGuild) {
      createNewGuildOperation(guild)
    } else {
      await Guild.findOneAndUpdate(
        { guildId: guild.id },
        { $set: { guildName: guild.name } },
        { $set: { guildMemberCount: guild.approximateMemberCount } },
        { $set: { guildPresenceCount: guild.approximatePresenceCount } },
        { $set: { guildOwnerId: guild.ownerId } },
        { $set: { guildLang: guild.preferredLocale } },
        { $set: { guildNsfwFilter: guild.explicitContentFilter } },
        { $set: { guildBotLang: enumLang.EN_US } },
        { $set: { createdAt: new Date() } },
        { $set: { deletedAt: null } },
        { $set: { active: true } }
      )
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = createGuildOperation
