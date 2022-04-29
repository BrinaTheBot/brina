const { MessageEmbed } = require("discord.js");

module.exports.run = async (inter) => {
    const Response = new MessageEmbed()
    .setColor('GREEN')
    .addField('Nome:', `${inter.guild.name}`, false)
    .addField('Membros:', `${inter.guild.memberCount}`, false);

    await inter.reply({embeds: [Response]});
}

module.exports.help = {
    name: 'server',
    memberPermissions: ['MANAGE_ROLES'],
}