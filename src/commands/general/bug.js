const { EmbedBuilder } = require('discord.js')
const loggerOperation = require('../../utils/log/loggerOperation')
const enumEmoji = require('../../enums/enumEmoji')

module.exports.run = async (inter) => {
  try {
    const bug = new EmbedBuilder()
      .setColor('#D15958')
      .setAuthor({
        name: 'Brina',
        iconURL:
          'https://user-images.githubusercontent.com/92398466/227223245-3e890f87-26cb-45d8-a091-9623b6390b71.jpg'
      })
      .setTitle(`Reportar bug ${enumEmoji.E_CAT_BUG_HUNTER}`)
      .setDescription(
        `**Encontrou um bug ou comportamento estranho?** \n\n${enumEmoji.E_GITHUB} [Informe no GitHub](https://github.com/BrinaTheBot/brina/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=) \n${enumEmoji.E_DISCORD} [Informe em nosso Servidor](https://discord.gg/99P8Dtg8x3)`
      )

    await inter.reply({ embeds: [bug] })
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
  name: 'bug',
  memberPermissions: []
}
