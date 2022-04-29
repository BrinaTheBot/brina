const discord = require('discord.js')
const dotenv = require('dotenv')
const fs = require('fs')
const { Routes } = require('discord-api-types/v9')
const Client = new discord.Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MEMBERS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        discord.Intents.FLAGS.GUILD_VOICE_STATES
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
})

dotenv.config()

Client.commands = new discord.Collection();
Client.events = new discord.Collection();
module.exports.Client = Client

// Event Handler
fs.readdirSync('./events/').forEach(dir => {
    var jsFiles = fs.readdirSync('./events/').filter(f => f.split('.').pop() === 'js');
    if (jsFiles.length <= 0) return console.log('[EVENTS] 🔴 File not found!');
    let check = false
    jsFiles.forEach(file => {
        const eventGet = require(`./events/${file}`)

        try {
            Client.events.set(eventGet.name, eventGet)
            if(check == false) {
                console.log(`[EVENTS] 🟢 ${file} was loaded!`)
                check = true
            }
        } catch(error) {
            return console.log(error)
        }
    });
});

// Commands Handler
fs.readdirSync('./commands/').forEach(dir => {
    fs.readdir(`./commands/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = fs.readdirSync(`./commands/${dir}`).filter(f => f.split('.').pop() === 'js');
        if (jsFiles.length <= 0) return console.log('[COMMANDS] 🔴 Command not found!');

        jsFiles.forEach(file => {
            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`[COMMANDS] 🟢 ${file} was loaded!`)

            try {
                Client.commands.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        });
    });
});


Client.login(process.env.DISCORD_TOKEN);