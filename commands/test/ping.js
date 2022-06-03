const { MessageEmbed } = require("discord.js");

module.exports.run = async (inter) => {
    try {
        const ping = new MessageEmbed()
        .setColor('GREEN')
        .setDescription('🏓 Pong!')
    
        await inter.reply({embeds: [ping]})
        
    } catch (error) {
        const erro = new MessageEmbed()
        .setColor('RED')
        .setDescription('🔴 Ocorreu um erro ao executar o comando! Caso isso persista contate os desenvolvedores.')
    
        await inter.reply({embeds: [erro]})
        
        console.log(error)
    }

}

module.exports.help = {
    name: 'ping',
    memberPermissions: ['MANAGE_ROLES']
}