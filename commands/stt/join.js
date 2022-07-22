const Client = require('../../index').Client
const { EmbedBuilder } = require('discord.js')
const { joinVoiceChannel, getVoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice')

module.exports.run = async (inter) => {
    try {
        /* ---- If user is not in a voice channel ---- */
        const noChannel = new EmbedBuilder()
        .setColor('Orange')
        .setDescription('Entre em um canal de voz antes de usar o comando `/join`!')

        if(!inter.member.voice.channel){return await inter.reply({embeds: [noChannel]})}

        /* ---- If user is in a voice channel ---  */
        // Create voice connection
        const connection = joinVoiceChannel({
            channelId: inter.member.voice.channel.id,
            guildId: inter.channel.guild.id,
            adapterCreator: inter.channel.guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: true,
        })

        // join channel
        connection    

        // Interaction reply        
        const conectado = new EmbedBuilder()
        .setColor('Green')
        .setDescription('Estou conectada')
    
        await inter.reply({embeds: [conectado]}) 

        // voice receiver log
        // connection.receiver.speaking.on('start', userId => console.log(`User ${userId} started speaking 🔊`))
        // connection.receiver.speaking.on('end', userId => console.log(`User ${userId} stopped speaking 🔈`))


    } catch (error) {
        const erro = new EmbedBuilder()
        .setColor('Yellow')
        .setDescription('Oh não, ocorreu um erro!\n Caso isso persista, contate os desenvolvedores.')

        await inter.reply({embeds: [erro]})

        console.log(error)    
    } 
}

module.exports.help = {
    name: 'join',
    memberPermissions: []
}