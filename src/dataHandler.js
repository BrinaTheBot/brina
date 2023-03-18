require('dotenv').config()

async function createCmd(Client, guildId) {
    const data = [
        {
            name: 'ping',
            description: '[🛡 GUILD] - Responde Pong!',
        },
        {
            name: 'debug',
            description: 'debug voice'
        },
        {
            name: 'server',
            description: '[🛡 GUILD] - Informações do servidor',
        },
        {
            name: 'join',
            description: '[🛡 GUILD] - Adiciona a Brina ao canal de voz',
        },
        {
            name: 'leave',
            description: '[🛡 GUILD] - Desconecta a Brina do canal de voz',
        }, 
        {
            name: 'stt',
            description: '[🛡 GUILD] - Inicia a transcrição',
        },
    ]

    await Client.guilds.cache.get(process.env.SUPPORT_GUILD_ID)?.commands.set(data);
}

async function globalCmd(Client) {
    const data = [
                {
                    name: 'join',
                    description: 'Adiciona a Brina ao canal de voz',
                },
                {
                    name: 'leave',
                    description: 'Desconecta a Brina do canal de voz',
                }, 
    ]
    await Client.application?.commands.set(data);
}
module.exports = { createCmd, globalCmd }