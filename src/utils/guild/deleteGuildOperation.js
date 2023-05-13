const Guild = require('../../models/guild')

async function deleteGuildOperation(guild) {
  try {
    await Guild.findOneAndUpdate(
      { guildId: guild.id },
      { $set: { active: false, deletedAt: new Date() } },
    )

  } catch (error) {
    console.log(error)
  }
}

module.exports = deleteGuildOperation