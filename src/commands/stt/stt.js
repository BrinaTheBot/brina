const Client = require('../../../index').Client
const vosk = require('vosk')
const { getVoiceConnection } = require('@discordjs/voice')
const { EmbedBuilder } = require("discord.js");

module.exports.run = async (inter) => {
    try {
        const connection = getVoiceConnection(inter.channel.guild.id)
    
        // If bot isn't in a voice channel
        const noChannel = new EmbedBuilder()
        .setColor('Orange')
        .setDescription('Não estou em nenhum canal de voz!')

        if(!connection){return await inter.reply({embeds: [noChannel]})}

        await inter.reply('não bugou')

    } catch (error) {
        const erro = new EmbedBuilder()
        .setColor('Yellow')
        .setDescription('Oh não, ocorreu um erro!\n Caso isso persista, contate os desenvolvedores.')

        await inter.reply({embeds: [erro]})
        
        console.log(error)
    } 
}
module.exports.help = {
    name: 'stt',
    memberPermissions: []
}
