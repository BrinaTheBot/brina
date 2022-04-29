const Client = require('../../index').Client
const { MessageEmbed } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice')


module.exports.run = async (inter) => {
    const connection = joinVoiceChannel({
        channelId: inter.member.voice.channel.id,
        guildId: inter.channel.guild.id,
        adapterCreator: inter.channel.guild.voiceAdapterCreator,
    })

    connection.destroy()   
    console.log('The connection was destroyed!')

    const desconectado = new MessageEmbed()
    .setColor('RED')
    .setDescription('🔇 Fui desconectada')

    await inter.reply({embeds: [desconectado]})
}

module.exports.help = {
    name: 'leave',
    memberPermissions: []
}