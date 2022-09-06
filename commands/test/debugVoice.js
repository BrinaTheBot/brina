const { generateDependencyReport } = require("@discordjs/voice");
const { EmbedBuilder } = require("discord.js");

module.exports.run = async (inter) => {
    try {    
        console.log(generateDependencyReport())
        console.log(inter.channel.id)
        await inter.reply({content: 'Check the console', ephemeral: true})        
    } catch (error) {
        console.log(error)
    }
}

module.exports.help = {
    name: 'debug',
    memberPermissions: []
}