var mongoose = require('mongoose');

var ConnectorSchema = new mongoose.Schema({
  name: String,
  endpoint: String
});

module.exports = mongoose.model('Connector', ConnectorSchema);
