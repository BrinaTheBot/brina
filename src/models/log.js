const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
  guild: { type: Object },
  command: {
    commandName: { type: String },
    interactionId: { type: String }
  },
  triggeredBy: {
    userName: { type: String },
    userId: { type: String }
  },
  channel: { type: String },
  date: { type: Date, default: Date.now }
},
{ collection: 'logs' })

module.exports = mongoose.model('log', logSchema)