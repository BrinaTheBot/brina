const Client = require('../../index').Client
const { EmbedBuilder } = require('discord.js')
const { joinVoiceChannel, EndBehaviorType } = require('@discordjs/voice')
const { OpusEncoder } = require('@discordjs/opus')
const vosk = require('vosk')

module.exports.run = async (inter) => {
    try {
        const channel = inter.channel.id
        /* ---- If user is not in a voice channel ---- */
        const noChannel = new EmbedBuilder()
            .setColor('Orange')
            .setDescription('Entre em um canal de voz antes de usar o comando `/join`!')

        if (!inter.member.voice.channel) { return await inter.reply({ embeds: [noChannel] }) }

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

        await inter.reply({ embeds: [conectado] })

        // voice receiver log
        //connection.receiver.speaking.on('start', userId => console.log(`User <@${userId}> started speaking 🔊`))
        //connection.receiver.speaking.on('end', userId => console.log(`User <@${userId}> stopped speaking 🔈`))

        //----------------- TESTING NEW STUFF ----------------------------//
        vosk.setLogLevel(-1)
        const ptModel = new vosk.Model('E:/Projetos/Brina-bot/voskModels/pt')
        const rec = new vosk.Recognizer({ model: ptModel, sampleRate: 48000 })

        // prevent from listening to bots
        connection.receiver.speaking.on('start', async (user) => {
            if (user.bot) return
            console.log(`Listening to <@${user}>`)

            const opusStream = connection.receiver.subscribe(user, {
                end: {
                    behavior: EndBehaviorType.AfterSilence,
                    duration: 200,
                }
            })

            let buffer = []
            opusStream.on('data', (data) => {
                buffer.push(data)
            })

            opusStream.on('end', async () => {
                buffer = Buffer.concat(buffer)
                const duration = buffer.length / 48000 / 4
                console.log('duration: ' + duration)

                async function convert_audio(input) {
                    try {
                        // stereo to mono channel
                        const data = new Int16Array(input)
                        const ndata = data.filter((el, idx) => idx % 2);
                        return Buffer.from(ndata);
                    } catch (error) {
                        console.log(error)
                        console.log('convert_audio: ' + e)
                        throw e;
                    }
                }

                try {
                    let new_buffer = await convert_audio(buffer)
                    let out = await transcribe(new_buffer, channel)
                    if (out != null) {
                        transcript(out, channel, user)
                    }
                } catch (error) {
                    console.log('buffer: ' + e)
                }

                async function transcribe(buffer) {
                    rec.acceptWaveform(buffer)
                    let ret = rec.result().text // this isn't working
                    // IT'S WORKING SO FAR
                    console.log('vosk:' + ret)
                    return ret
                }

                function transcript(txt, user) {
                    if (txt && txt.length) {
                        //Client.channels.cache.send(user.username + ': ' + txt)
                        console.log(user.username + ': ' + txt)
                    }
                }
            })
        })




    } catch (error) {
        const erro = new EmbedBuilder()
            .setColor('Yellow')
            .setDescription('Oh não, ocorreu um erro!\n Caso isso persista, contate os desenvolvedores.')

        await inter.editReply({ embeds: [erro] })

        console.log(error)
    }
}

module.exports.help = {
    name: 'join',
    memberPermissions: []
}