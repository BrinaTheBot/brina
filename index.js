/* eslint-disable no-unused-vars */
const discord = require('discord.js')
const dotenv = require('dotenv')
const fs = require('fs')
const mongoose = require('mongoose')

const Client = new discord.Client({
  intents: [
    discord.GatewayIntentBits.Guilds,
    discord.GatewayIntentBits.GuildMembers,
    discord.GatewayIntentBits.GuildMessages,
    discord.GatewayIntentBits.GuildMessageReactions,
    discord.GatewayIntentBits.GuildVoiceStates
  ],
  allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
})

dotenv.config()

Client.commands = new discord.Collection()
Client.events = new discord.Collection()
module.exports.Client = Client

fs.readdirSync('./src/events/').forEach((dir) => {
  fs.readdir(`./src/events/${dir}`, (err) => {
    if (err) throw err

    let jsFiles = fs
      .readdirSync(`./src/events/${dir}`)
      .filter((f) => f.split('.').pop() === 'js')
    if (jsFiles.length <= 0) return console.log('[EVENTS] 🔴 event not found!')

    jsFiles.forEach((file) => {
      let eventGet = require(`./src/events/${dir}/${file}`)
      console.log(`[EVENTS] 🟢 ${file} was loaded!`)

      try {
        Client.events.set(eventGet.name, eventGet)
      } catch (err) {
        return console.log(err)
      }
    })
  })
})

fs.readdirSync('./src/commands/').forEach((dir) => {
  fs.readdir(`./src/commands/${dir}`, (err) => {
    if (err) throw err

    let jsFiles = fs
      .readdirSync(`./src/commands/${dir}`)
      .filter((f) => f.split('.').pop() === 'js')
    if (jsFiles.length <= 0)
      return console.log('[COMMANDS] 🔴 Command not found!')

    jsFiles.forEach((file) => {
      let fileGet = require(`./src/commands/${dir}/${file}`)
      console.log(`[COMMANDS] 🟢 ${file} was loaded!`)

      try {
        Client.commands.set(fileGet.help.name, fileGet)
      } catch (err) {
        return console.log(err)
      }
    })
  })
})

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log('[DATABASE] 🟢 Connected!'))

Client.login(process.env.DISCORD_TOKEN)
