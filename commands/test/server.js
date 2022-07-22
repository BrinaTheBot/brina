const { EmbedBuilder } = require("discord.js");

module.exports.run = async (inter) => {
    try {
        const Response = new EmbedBuilder()
        .setColor('Green')
        .addFields([
            {name: 'Nome:', value: `${inter.guild.name}`},
            {name: 'Membros:', value: `${inter.guild.memberCount}`},
        ])
    
        await inter.reply({embeds: [Response]})

    } catch (error) {
        const erro = new EmbedBuilder()
        .setColor('Yellow')
        .setDescription('Oh não, ocorreu um erro!\n Caso isso persista, contate os desenvolvedores.')
    
        await inter.reply({embeds: [erro]})
        
        console.log(error)
    }
}

module.exports.help = {
    name: 'server',
    memberPermissions: []
}