/* eslint-disable no-inner-declarations */
const { EmbedBuilder } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice')
const DiscordVoice = require('@discordjs/voice')
const vosk = require('vosk')
const prism = require('prism-media')
const path = require('path')
const Guild = require('../../models/guild')
const loggerOperation = require('../../utils/log/loggerOperation')

module.exports.run = async (inter) => {
  try {
    await inter.deferReply()

    const noChannel = new EmbedBuilder()
      .setColor('Orange')
      .setDescription(
        'Entre em um canal de voz antes de usar o comando `/join`!'
      )

    if (!inter.member.voice.channel) {
      await inter.editReply({ embeds: [noChannel] })
      loggerOperation(inter, 'Join')
      return
    }

    const connection = joinVoiceChannel({
      channelId: inter.member.voice.channel.id,
      guildId: inter.channel.guild.id,
      adapterCreator: inter.channel.guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: true
    })

    connection

    const conectado = new EmbedBuilder()
      .setColor('Green')
      .setDescription('Estou conectada')

    await inter.editReply({ embeds: [conectado] })
    loggerOperation(inter, 'Join')

    voiceEntry(connection.receiver)

    async function convertAudioStereoToMono(input) {
      try {
        const data = new Int16Array(input)
        const ndata = data.filter((el, idx) => idx % 2)
        return Buffer.from(ndata)
      } catch (e) {
        console.log(e)
        console.log('convertAudioStereoToMono: ' + e)
        throw e
      }
    }

    vosk.setLogLevel(-1)

    const getGuild = await Guild.findOne({ guildId: inter.guildId })
    let lang = getGuild.guildBotLang

    const pathToModel = path.resolve('src/resources/voskModels/', `${lang}/`)
    const model = new vosk.Model(pathToModel)
    const rec = new vosk.Recognizer({ model: model, sampleRate: 48000 })

    function voiceEntry(receiver) {
      connection.receiver.speaking.on('start', async (user) => {
        if (user.bot) {
          return
        }

        const audioStream = receiver.subscribe(user, {
          end: {
            behavior: DiscordVoice.EndBehaviorType.AfterSilence,
            duration: 100
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

          try {
            let new_buffer = await convertAudioStereoToMono(buffer)
            let out = await transcribe(new_buffer)
            if (out != null) processCommandsQuery(out, user)
          } catch (e) {
            console.log('tmpraw rename: ' + e)
          }
        })
      })

      async function processCommandsQuery(txt, user) {
        if (txt && txt.length) {
          try {
            const transcription = new EmbedBuilder()
              .setColor('F1A7AE')
              .setDescription(`<@${user}>: ${txt}`)
              .setTimestamp()
              .setFooter({ text: `Idioma: ${lang}` })

            await inter.channel.send({ embeds: [transcription] })
          } catch (error) {
            console.log(error)
          }
        }
      }

      async function transcribe(buffer) {
        await rec.acceptWaveform(buffer)
        let ret = await rec.result().text
        return ret
      }
    }
  } catch (error) {
    const erro = new EmbedBuilder()
      .setColor('Yellow')
      .setTitle('Oh não, ocorreu um erro!')
      .setDescription('Caso isso persista, contate os desenvolvedores.')

    await inter.editReply({ embeds: [erro] })

    console.log(error)
  }
}

module.exports.help = {
  name: 'join',
  memberPermissions: []
}
