const { EmbedBuilder } = require('discord.js')
const loggerOperation = require('../../utils/log/loggerOperation')

module.exports.run = async (inter) => {
  try {
    const info = new EmbedBuilder()
      .setColor('#D15958')
      .setAuthor({
        name: 'Brina',
        iconURL:
          'https://user-images.githubusercontent.com/92398466/227223245-3e890f87-26cb-45d8-a091-9623b6390b71.jpg'
      })
      .setTitle('Olá, eu sou a Brina')
      .setDescription(
        'Brina é um bot de acessibilidade que oferece funções de transcrição de texto. Ela foi criada para ajudar a tornar o Discord mais acessível para usuários com deficiência, permitindo que eles aproveitem totalmente a plataforma.'
      )
      .addFields(
        { name: '\u200B', value: '\u200B' },
        {
          name: 'Features:',
          value: '• Transcrição em pt-BR e en-US. \n*(em breve mais idiomas)*'
        },
        {
          name: 'Em breve:',
          value:
            '• Localização dos comandos. \n• OCR (Optical character recognition)'
        },
        {
          name: 'Contribua:',
          value:
            '• Brina é um projeto de código aberto. \nContribua: [Github](https://github.com/ashtrindade/brina)'
        },
        { name: '\u200B', value: '\u200B' },
        {
          name: 'Icon:',
          value:
            '• Esse icon lindo foi feito por [Nikkoe](https://twitter.com/NikkoeNi).'
        }
      )
      .setImage(
        'https://user-images.githubusercontent.com/92398466/227223245-3e890f87-26cb-45d8-a091-9623b6390b71.jpg'
      )

    await inter.reply({ embeds: [info] })

    loggerOperation(inter, 'Info')
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
  name: 'info',
  memberPermissions: []
}
