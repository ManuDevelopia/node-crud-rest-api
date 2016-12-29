const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
var db;

var ProjectCtrl = require('./controllers/project.js');
var projects = express.Router();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/local', function(err, database) {
  if (err){return console.log(err);}

  db = database;
  app.listen(3000, function (){
    console.log('Listening on port 3000');
  }); 
});

// API
projects.route('/projects')
  .get(ProjectCtrl.findAll)
  .post(ProjectCtrl.create);

projects.route('/project/:id')
  .get(ProjectCtrl.findById)
  .put(ProjectCtrl.update)
  .delete(ProjectCtrl.delete);

app.use('/api', projects);

app.get('/api', function (req, res) {
  res.send({
    app: 'node-test', 
    ver: '0.1.0',
    author: '@manudevelopia'
  });

});
