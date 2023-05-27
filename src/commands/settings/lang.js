const { EmbedBuilder } = require('discord.js')
const loggerOperation = require('../../utils/log/loggerOperation')
const updateGuildLangOperation = require('../../utils/guild/updateGuildLangOperation')
const enumLang = require('../../enums/enumLang')

module.exports.run = async (inter) => {
  try {
    if (!inter.isChatInputCommand()) return

    if (inter.options.getSubcommand() === 'en') {
      await updateGuildLangOperation(inter, enumLang.EN_US)
      await loggerOperation(inter)
    } else if (inter.options.getSubcommand() === 'pt') {
      await updateGuildLangOperation(inter, enumLang.PT_BR)
      await loggerOperation(inter)
    }
  } catch (error) {
    const erro = new EmbedBuilder()
      .setColor('Yellow')
      .setTitle('Oh não, ocorreu um erro!')
      .setDescription('Caso isso persista, contate os desenvolvedores.')

    await inter.editReply({ embeds: [erro] })

    console.log(error)
  }
}

module.exports.help = {
  name: 'lang',
  memberPermissions: []
}
