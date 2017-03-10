var mongoose = require('mongoose');

var ConnectorSchema = new mongoose.Schema({
  name: String,
  endpoint: String,
  metrics: [{type: mongoose.Schema.Types.ObjectId, ref: 'Metric'}]
});

module.exports = mongoose.model('Connector', ConnectorSchema);
