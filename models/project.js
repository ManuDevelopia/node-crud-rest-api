var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  name: String
}); 

module.exports = mongoose.model('Project', ProjectSchema);


