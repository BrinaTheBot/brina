const { MessageEmbed } = require("discord.js");

module.exports.run = async (inter) => {
    const ping = new MessageEmbed()
    .setColor('GREEN')
    .setDescription('🏓 Pong!')

    await inter.reply({embeds: [ping]});
}

module.exports.help = {
    name: 'ping',
    memberPermissions: ['MANAGE_ROLES']
}