const { EmbedBuilder } = require('discord.js')
const loggerOperation = require('../../utils/log/loggerOperation')

module.exports.run = async (inter) => {
  try {
    const ping = new EmbedBuilder().setColor('Green').setDescription('🏓 Pong!')

    await inter.reply({ embeds: [ping] })

    await loggerOperation(inter)
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
  name: 'ping',
  memberPermissions: []
}
