async function createCmd(Client, guildId) {
    const data = [
        // ping cmd
        {
            name: 'ping',
            description: '[🛡 GUILD] - Responde Pong!',
        },

        // debug cmd
        {
            name: 'debug',
            description: 'debug voice'
        },

        // server cmd
        {
            name: 'server',
            description: '[🛡 GUILD] - Informações do servidor',
        },

        // join cmd
        {
            name: 'join',
            description: '[🛡 GUILD] - Adiciona a Brina ao canal de voz',
        },

        // leave cmd
        {
            name: 'leave',
            description: '[🛡 GUILD] - Desconecta a Brina do canal de voz',
        }, 

        //stt cmd
        {
            name: 'stt',
            description: '[🛡 GUILD] - Inicia a transcrição',
        },
    ]

    await Client.guilds.cache.get('965665762637389825')?.commands.set(data);
}

// GLOBAL COMMANDS
async function globalCmd(Client) {
    const data = [
                // join cmd
                {
                    name: 'join',
                    description: 'Adiciona a Brina ao canal de voz',
                },
        
                // leave cmd
                {
                    name: 'leave',
                    description: 'Desconecta a Brina do canal de voz',
                }, 
    ]
    await Client.application?.commands.set(data);
}
module.exports = { createCmd, globalCmd }