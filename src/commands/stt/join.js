const Client = require('../../../index').Client
const { EmbedBuilder } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice')
const DiscordVoice = require('@discordjs/voice')
const vosk = require('vosk')
const prism = require('prism-media')

module.exports.run = async (inter) => {
    try {
        const channel = inter.channel.id
        // If user is not in a voice channel
        const noChannel = new EmbedBuilder()
            .setColor('Orange')
            .setDescription('Entre em um canal de voz antes de usar o comando `/join`!')

        if (!inter.member.voice.channel) { return await inter.reply({ embeds: [noChannel] }) }

        // If user is in a voice channel
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
        speak_impl(connection.receiver)

        async function convert_audio(input) {
            try {
                // stereo to mono channel
                const data = new Int16Array(input)
                const ndata = data.filter((el, idx) => idx % 2);
                return Buffer.from(ndata);
            } catch (e) {
                console.log(e)
                console.log('convert_audio: ' + e)
                throw e;
            }
        }

        vosk.setLogLevel(-1)
        const ptModel = new vosk.Model('E:/Projetos/Brina-bot/src/voskModels/pt')
        const rec = new vosk.Recognizer({ model: ptModel, sampleRate: 48000 })


        function speak_impl(receiver) {
            connection.receiver.speaking.on('start', async (user) => {
                if (user.bot) { return }
                console.log(`Listening to <@${user}>`)

                const audioStream = receiver.subscribe(user, {
                    end: {
                        behavior: DiscordVoice.EndBehaviorType.AfterSilence,
                        duration: 100,
                    }
                })
                const decodedAudioStream = new prism.opus.Decoder({
                    channels: 2,
                    rate: 48000,
                    frameSize: 960
                })

                audioStream.pipe(decodedAudioStream)
                decodedAudioStream.on('error', (e) => {
                    console.log('audioStream: ' + e)
                })

                let buffer = []

                decodedAudioStream.on('data', (data) => {
                    buffer.push(data)
                })

                decodedAudioStream.on('end', async () => {
                    buffer = Buffer.concat(buffer)
                    const duration = buffer.length / 48000 / 4

                    console.log("duration: " + duration)

                    try {
                        let new_buffer = await convert_audio(buffer)
                        let out = await transcribe(new_buffer)
                        if (out != null)
                            process_commands_query(out, user)
                    } catch (e) {
                        console.log('tmpraw rename: ' + e)
                    }
                })
            })

            async function process_commands_query(txt, user) {
                if (txt && txt.length) {
                    await inter.channel.send(`<@${user}>: ${txt}`)
                }
            }

            async function transcribe(buffer) {
                await rec.acceptWaveform(buffer)
                let ret = await rec.result().text
                console.log('vosk:', ret)
                return ret
            }
        }
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