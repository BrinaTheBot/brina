const Guild = require('../../models/guild')
const enumLang = require('../../enums/enumLang')

async function createNewGuildOperation(guild) {
  try {
    const newGuild = new Guild({
      guildId: guild.id,
      guildName: guild.name,
      guildMemberCount: guild.approximateMemberCount,
      guildPresenceCount: guild.approximatePresenceCount,
      guildOwnerId: guild.ownerId,
      guildLang: guild.preferredLocale,
      guildNsfwFilter: guild.explicitContentFilter,
      guildBotLang: enumLang.EN_US
    })
    
    await newGuild.save()

  } catch (error) {
    console.log(error)
  }
}

module.exports = createNewGuildOperation