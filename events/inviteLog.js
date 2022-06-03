const { MessageEmbed } = require('discord.js')
const Client = require('../index').Client

const logGuild = '965665762637389825'
const logChannel = '965668041444712508'

// Added
Client.on("guildCreate", async(guild) => {    
    try {
        const channel = Client.guilds.cache.get(logGuild).channels.cache.get(logGuild)

        const added = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Bot added to a server`)
            .addField('\u200B', `**Name:** ${guild.name} \n**Members:** ${guild.memberCount} \n**ID:** ${guild.id}`, false)
            .addField('\u200B', `**Owner** ${await guild.fetchOwner()} \n**ID:** ${guild.ownerId}`, false)   
        
            channel.send({embeds: [added]})
    } catch (error) {
        console.log(error)
    }
})

// Removed
Client.on("guildDelete", async(guild) => {
    try {
        const channel = Client.guilds.cache.get(logGuild).channels.cache.get(logChannel)

        const removed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`Bot removed from a server`)
            .addField('\u200B', `**Name:** ${guild.name} \n**Members:** ${guild.memberCount} \n**ID:** ${guild.id}`, false)
            .addField('\u200B', `**Owner: ** ${await guild.fetchOwner()} \n**ID:** ${guild.ownerId}`, false)  
            
            channel.send({embeds: [removed]})
    } catch (error) {
        console.log(error)
    }
})