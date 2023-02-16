const { EmbedBuilder } = require("discord.js");

module.exports.run = async (inter) => {
    try {
        const ping = new EmbedBuilder()
        .setColor('Green')
        .setDescription('🏓 Pong!')
    
        await inter.reply({embeds: [ping]})
        
    } catch (error) {
        const erro = new EmbedBuilder()
        .setColor('Yellow')
        .setDescription('Oh não, ocorreu um erro!\n Caso isso persista, contate os desenvolvedores.')
    
        await inter.reply({embeds: [erro]})
        
        console.log(error)
    }

}

module.exports.help = {
    name: 'ping',
    memberPermissions: []
}