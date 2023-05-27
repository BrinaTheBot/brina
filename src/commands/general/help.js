const { EmbedBuilder } = require('discord.js')
const loggerOperation = require('../../utils/log/loggerOperation')
const enumEmoji = require('../../enums/enumEmoji')

module.exports.run = async (inter) => {
  try {
    const help = new EmbedBuilder()
      .setColor('#D15958')
      .setAuthor({
        name: 'Brina',
        iconURL:
          'https://user-images.githubusercontent.com/92398466/227223245-3e890f87-26cb-45d8-a091-9623b6390b71.jpg'
      })
      .setTitle('Comandos')
      .setDescription(
        `${enumEmoji.E_BLOB_THINK} </info:1109528459371356251> \nHistória da Brina, suas ferramentas e outras informações. \n\n:flag_br: </lang pt:1107061766841696266> \nDefine o idioma para Português Brasileiro. \n\n:flag_us: </lang en:1107061766841696266> \nDefine o idioma para Inglês Estadunidense. \n\n${enumEmoji.E_BLOB_YES} </join:1000080285439905882> \nInicia a transcrição. \n\n${enumEmoji.E_BLOB_NO} </leave:1000080285439905883>\nInterrompe a transcrição. \n\n${enumEmoji.E_CAT_BUG_HUNTER} </bug:1112085561835004025> \nReportar bug.`
      )

    await inter.reply({ embeds: [help] })
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
  name: 'help',
  memberPermissions: []
}
