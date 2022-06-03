const { MessageEmbed } = require("discord.js");

module.exports.run = async (inter) => {
    try {
        const Response = new MessageEmbed()
        .setColor('GREEN')
        .addField('Nome:', `${inter.guild.name}`, false)
        .addField('Membros:', `${inter.guild.memberCount}`, false);
    
        await inter.reply({embeds: [Response]})

    } catch (error) {
        const erro = new MessageEmbed()
        .setColor('RED')
        .setDescription('🔴 Ocorreu um erro ao executar o comando! Caso isso persista contate os desenvolvedores.')
    
        await inter.reply({embeds: [erro]})
        
        console.log(error)
    }
}

module.exports.help = {
    name: 'server',
    memberPermissions: ['MANAGE_ROLES']
}