const Client = require('../../index').Client
const { MessageEmbed } = require('discord.js')
const { joinVoiceChannel, VoiceConnectionStatus } = require('@discordjs/voice')


module.exports.run = async (inter) => {
    const connection = joinVoiceChannel({
        channelId: inter.member.voice.channel.id,
        guildId: inter.channel.guild.id,
        adapterCreator: inter.channel.guild.voiceAdapterCreator,
    })

    connection
    connection.on(VoiceConnectionStatus.Ready, () => {
        console.log('The connection has entered the Ready state!')
    })
    
    const conectado = new MessageEmbed()
    .setColor('GREEN')
    .setDescription('🎧 Estou conectada')

    await inter.reply({embeds: [conectado]})
}

module.exports.help = {
    name: 'join',
    memberPermissions: []
}