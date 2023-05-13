const { ApplicationCommandOptionType } = require('discord.js')
require('dotenv').config()

async function createCmd(Client) {
  const data = [
    {
      name: 'ping',
      description: '[🛡 GUILD] - Responde Pong!',
    },
    {
      name: 'debug',
      description: '[🛡 GUILD] - Debug voice'
    },
    {
      name: 'server',
      description: '[🛡 GUILD] - Informações do servidor',
    },
    {
      name: 'join',
      description: '[🛡 GUILD] - Adiciona a Brina ao canal de voz',
    },
    {
      name: 'leave',
      description: '[🛡 GUILD] - Desconecta a Brina do canal de voz',
    },
    {
      name: 'stt',
      description: '[🛡 GUILD] - Inicia a transcrição',
    },
    {
      name: 'lang',
      description: '[🛡 GUILD] - Altera o idioma do bot',
      options: [
        {
          name: 'en',
          description: 'Inglês EUA',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'pt',
          description: 'Português Brasileiro',
          type: ApplicationCommandOptionType.Subcommand
        }
      ]
    }
  ]

  await Client.guilds.cache.get(process.env.SUPPORT_GUILD_ID)?.commands.set(data)
}

async function globalCmd(Client) {
  const data = [
    {
      name: 'join',
      description: 'Adicionar bot a um canal de voz',
    },
    {
      name: 'leave',
      description: 'Desconecte o bot do canal de voz',
    },
    {
      name: 'lang',
      description: 'Alterar idioma do bot',
      options: [
        {
          name: 'en',
          description: 'Inglês EUA',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'pt',
          description: 'Português Brasileiro',
          type: ApplicationCommandOptionType.Subcommand
        }
      ]
    }
  ]
  await Client.application?.commands.set(data)
}
module.exports = { createCmd, globalCmd }