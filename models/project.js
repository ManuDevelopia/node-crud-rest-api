var mongoose = require('mongoose');


var ProjectSchema = new mongoose.Schema({
  name: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}); 

module.exports = mongoose.model('Project', ProjectSchema);


