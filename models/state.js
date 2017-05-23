var mongoose = require('mongoose');

var StateSchema = new mongoose.Schema({
  date: Date,
  name: String,
  endpoint: String,
  connectors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Connector'}]
});

module.exports = mongoose.model('State', StateSchema);
