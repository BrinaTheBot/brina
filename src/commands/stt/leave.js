const { EmbedBuilder } = require('discord.js')
const { getVoiceConnection } = require('@discordjs/voice')
//const loggerOperation = require('../../utils/log/loggerOperation')

module.exports.run = async (inter) => {
  try {
    const connection = getVoiceConnection(inter.channel.guild.id)

    const noChannel = new EmbedBuilder()
      .setColor('Orange')
      .setDescription('Não estou em nenhum canal de voz!')

    if (!connection) {
      await inter.reply({ embeds: [noChannel] })
      // loggerOperation(inter, 'Leave')
      return
    }

    connection.destroy()

    const desconectado = new EmbedBuilder()
      .setColor('Red')
      .setDescription('🔇 Fui desconectada')

    await inter.reply({ embeds: [desconectado] })
    // loggerOperation(inter, 'Leave')
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
  name: 'leave',
  memberPermissions: []
}
