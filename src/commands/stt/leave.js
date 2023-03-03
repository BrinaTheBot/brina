const Client = require('../../../index').Client
const { EmbedBuilder } = require('discord.js')
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice')


module.exports.run = async (inter) => {
    try {
        const connection = getVoiceConnection(inter.channel.guild.id)

        // If bot isn't in a voice channel
        const noChannel = new EmbedBuilder()
        .setColor('Orange')
        .setDescription('Não estou em nenhum canal de voz!')

        if(!connection){return await inter.reply({embeds: [noChannel]})}

        // If bot is in a voice channel
        connection.destroy()
    
        const desconectado = new EmbedBuilder()
        .setColor('Red')
        .setDescription('🔇 Fui desconectada')
    
        await inter.reply({embeds: [desconectado]})

    } catch (error) {
        const erro = new EmbedBuilder()
        .setColor('Yellow')
        .setDescription('Oh não, ocorreu um erro!\n Caso isso persista, contate os desenvolvedores.')

        await inter.reply({embeds: [erro]})

        console.log(error)
    }
}

module.exports.help = {
    name: 'leave',
    memberPermissions: []
}