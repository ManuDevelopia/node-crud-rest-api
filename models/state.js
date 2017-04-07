var mongoose = require('mongoose');

var StateSchema = new mongoose.Schema({
  name: String,
  endpoint: String,
  metrics: [{type: mongoose.Schema.Types.ObjectId, ref: 'Metric'}]
});

module.exports = mongoose.model('State', StateSchema);
