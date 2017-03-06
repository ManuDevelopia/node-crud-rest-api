var mongoose =  require('mongoose');

var MetricSchema = new mongoose.Schema({
  name: String,
  value: String,
});

module.exports = mongoose.model('Metric', MetricSchema);
