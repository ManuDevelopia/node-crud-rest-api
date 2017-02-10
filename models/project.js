var mongoose = require('mongoose');


var ProjectSchema = new mongoose.Schema({
  name: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  url: String,
  connectors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Connector'}]
}); 

module.exports = mongoose.model('Project', ProjectSchema);


