const { EmbedBuilder } = require('discord.js')
const Client = require('../../index').Client
require('dotenv').config()

const logGuild = process.env.SUPPORT_GUILD_ID
const logChannel = process.env.SUPPORT_GUILD_LOG_CHANNEL

Client.on('guildCreate', async (guild) => {
  try {
    const channel = Client.guilds.cache.get(logGuild).channels.cache.get(logGuild)

    const added = new EmbedBuilder()
      .setColor('Green')
      .setTitle('Bot added to a server')
      .addFields([
        { name: '\u200B', value: `**Name:** ${guild.name} \n**Members:** ${guild.memberCount} \n**ID:** ${guild.id}` },
        { name: '\u200B', value: `**Owner** ${await guild.fetchOwner()} \n**ID:** ${guild.ownerId}` },
      ])

    channel.send({ embeds: [added] })
  } catch (error) {
    console.log(error)
  }
})

Client.on('guildDelete', async (guild) => {
  try {
    const channel = Client.guilds.cache.get(logGuild).channels.cache.get(logChannel)

    const removed = new EmbedBuilder()
      .setColor('Red')
      .setTitle('Bot removed from a server')
      .addFields([
        { name: '\u200B', value: `Name: ${guild.name} \nMembers: ${guild.memberCount} \nID: ${guild.id}` },
        { name: '\u200B', value: `Owner: <#${guild.ownerId}>` },
      ])

    channel.send({ embeds: [removed] })
  } catch (error) {
    console.log(error)
  }
})