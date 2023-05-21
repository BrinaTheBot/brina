const { EmbedBuilder } = require('discord.js')

module.exports.run = async (inter) => {
  try {
    const Response = new EmbedBuilder().setColor('Green').addFields([
      { name: 'Nome:', value: `${inter.guild.name}` },
      { name: 'Membros:', value: `${inter.guild.memberCount}` }
    ])

    await inter.reply({ embeds: [Response] })
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
  name: 'server',
  memberPermissions: []
}
