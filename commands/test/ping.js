module.exports.run = async (inter) => {
    await inter.reply({ content: 'Pong!' });
}

module.exports.help = {
    name: 'ping',
    memberPermissions: ['MANAGE_ROLES']
}