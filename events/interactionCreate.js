const { MessageEmbed } = require('discord.js')

const Client = require('../index').Client

Client.on('interactionCreate', async inter => {
    if(inter.isCommand()) {
        let commands = Client.commands.get(inter.commandName)
        if(!inter.member.permissions.has(commands.help.memberPermissions)){
            const responseErro = new MessageEmbed()
            .setColor('RED')
            .setDescription('🛑 Você não tem permissão para usar este comando!');

            return await inter.reply({embeds: [responseErro], ephemeral: true });
        }
        if(commands) commands.run(inter)
    }
})