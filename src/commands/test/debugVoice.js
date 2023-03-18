const { generateDependencyReport } = require('@discordjs/voice')

module.exports.run = async (inter) => {
  try {
    console.log(generateDependencyReport())
    console.log(`Requested on channel:${inter.channel.id}`)

    await inter.reply({ content: 'Check the console', ephemeral: true })
  } catch (error) {
    console.log(error)
  }
}

module.exports.help = {
  name: 'debug',
  memberPermissions: []
}