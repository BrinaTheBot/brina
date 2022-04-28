const Client = require('../index').Client

Client.on('messageCreate', async message => {
    if(message.author.bot || message.channel.type == 'DM') return
})