async function createCmd(Client, guildId) {
    const data = [
        // ping cmd
        {
            name: 'ping',
            description: '[🛡 ADMIN] - Responde Pong!',
        },

        // 🛡 server cmd
        {
            name: 'server',
            description: '[🛡 ADMIN] - Informações do servidor',
        },

        // join cmd
        {
            name: 'join',
            description: 'Adiciona a Brina ao canal de voz'
        },

        // leave cmd
        {
            name: 'leave',
            description: 'Desconecta a Brina do canal de voz'
        }, 
    ]

    await Client.guilds.cache.get('965665762637389825')?.commands.set(data);
}

/*
/**
 * Guild ID: 965665762637389825
 * @permissions [
    * KICK_MEMBERS
    * BAN_MEMBERS
    * ADMINISTRATOR
    * MANAGE_CHANNELS
    * MANAGE_GUILD
    * MANAGE_MESSAGES
    * MANAGE_ROLES
    * MANAGE_WEBHOOKS
    * MANAGE_THREADS
    * MANAGE_EMOJIS_AND_STICKERS
 * ]
 */

/**
 * User: <@id>
 * Role: <@&id>
 */


// GLOBAL COMMANDS
async function globalCmd(Client) {
    const data = [
    ]
    await Client.application?.commands.set(data);
}
module.exports = { createCmd, globalCmd }