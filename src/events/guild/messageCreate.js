const Client = require('../../../index').Client
const { ChannelType } = require('discord.js')

Client.on('messageCreate', async (message) => {
  if (message.author.bot || message.channel.type == ChannelType.DM) return
})
