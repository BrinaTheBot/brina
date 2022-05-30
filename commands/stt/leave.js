const Client = require('../../index').Client
const { MessageEmbed } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice')


module.exports.run = async (inter) => {
    try {
        const connection = joinVoiceChannel({
            channelId: inter.member.voice.channel.id,
            guildId: inter.channel.guild.id,
            adapterCreator: inter.channel.guild.voiceAdapterCreator,
        })
    
        connection.destroy()
    
        const desconectado = new MessageEmbed()
        .setColor('RED')
        .setDescription('🔇 Fui desconectada')
    
        await inter.reply({embeds: [desconectado]})

    } catch (error) {
        const erro = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription('Não estou em nenhum canal de voz!')

        await inter.reply({embeds: [erro]})
    }
}

module.exports.help = {
    name: 'leave',
    memberPermissions: []
}