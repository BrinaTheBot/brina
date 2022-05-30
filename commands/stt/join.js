const Client = require('../../index').Client
const { MessageEmbed } = require('discord.js')
const { joinVoiceChannel, VoiceReceiver, VoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice')


module.exports.run = async (inter) => {
    try {
        const connection = joinVoiceChannel({
            channelId: inter.member.voice.channel.id,
            guildId: inter.channel.guild.id,
            adapterCreator: inter.channel.guild.voiceAdapterCreator,
        })

        connection     
        
        const conectado = new MessageEmbed()
        .setColor('GREEN')
        .setDescription('🎧 Estou conectada')
    
        await inter.reply({embeds: [conectado]})   

    } catch (error) {
        const erro = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription('Entre em um canal de voz antes de usar o comando `/join`!')

        await inter.reply({embeds: [erro]})
    } 
}

module.exports.help = {
    name: 'join',
    memberPermissions: []
}