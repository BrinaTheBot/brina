const Client = require('../../index').Client
const { MessageEmbed } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice')

module.exports.run = async (inter) => {
    try {
        const connection = joinVoiceChannel({
            channelId: inter.member.voice.channel.id,
            guildId: inter.channel.guild.id,
            adapterCreator: inter.channel.guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: true,
        })

        connection     

        connection.receiver.speaking.on('start', userId => console.log(`User ${userId} started speaking`))
        connection.receiver.speaking.on('end', userId => console.log(`User ${userId} stopped speaking`))

        /*
        const opusStream = connection.receiver.subscribe(userId, {
            end: {
              behavior: EndBehaviorType.AfterSilence,
              duration: 100,
            },
        })
        */
        
        const conectado = new MessageEmbed()
        .setColor('GREEN')
        .setDescription('Estou conectada')
    
        await inter.reply({embeds: [conectado]})

    } catch (error) {
        const erro = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription('Entre em um canal de voz antes de usar o comando `/join`!')

        await inter.reply({embeds: [erro]})

        console.log(error)    
    } 
}

module.exports.help = {
    name: 'join',
    memberPermissions: []
}