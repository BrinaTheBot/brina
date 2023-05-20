const { EmbedBuilder } = require('discord.js')
const Guild = require('../../models/guild')

async function updateGuildLangOperation(inter, lang) {
  try {
    const getGuild = await Guild.findOne({ guildId: inter.guildId })

    if (getGuild.guildBotLang !== lang) {
      await Guild.findOneAndUpdate(
        { guildId: inter.guildId },
        { $set: { guildBotLang: lang } }
      )

      const success = new EmbedBuilder()
        .setColor('Green')
        .setDescription('Idioma atualizado')

      await inter.reply({ embeds: [success], ephemeral: true })
    } else {
      const fail = new EmbedBuilder()
        .setColor('Orange')
        .setDescription(`Este idioma já está ativo: ${lang}`)

      await inter.reply({ embeds: [fail], ephemeral: true })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = updateGuildLangOperation
