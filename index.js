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
Client.assets = new discord.Collection()
module.exports.Client = Client

fs.readdirSync('./src/events/').forEach((dir) => {
  var jsFiles = fs
    .readdirSync('./src/events/')
    .filter((f) => f.split('.').pop() === 'js')
  if (jsFiles.length <= 0) return console.log('[EVENTS] 🔴 File not found!')
  let check = false
  jsFiles.forEach((file) => {
    const eventGet = require(`./src/events/${file}`)

    try {
      Client.events.set(eventGet.name, eventGet)
      if (check == false) {
        console.log('[EVENTS] 🟢 %s was loaded!', file)
        check = true
      }
    } catch (error) {
      return console.log(error)
    }
  })
})

fs.readdirSync('./src/commands/').forEach((dir) => {
  fs.readdir(`./src/commands/${dir}`, (err) => {
    if (err) throw err

    var jsFiles = fs
      .readdirSync(`./src/commands/${dir}`)
      .filter((f) => f.split('.').pop() === 'js')
    if (jsFiles.length <= 0)
      return console.log('[COMMANDS] 🔴 Command not found!')

    jsFiles.forEach((file) => {
      var fileGet = require(`./src/commands/${dir}/${file}`)
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
