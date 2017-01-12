const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

var ProjectCtrl = require('./controllers/project');
var projects = express.Router();

var userCtrl = require('./controllers/user');
var users = express.Router();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/local', function(err, database) {
  if (err){
    return console.log(err);
  }

  app.listen(6000, function (){
    console.log('Listening on port 3000');
  }); 
});

// API - Project
projects.route('/projects')
  .get(ProjectCtrl.findAll)
  .post(ProjectCtrl.create);

projects.route('/projects/:name')
  .get(ProjectCtrl.findByName);

projects.route('/project/:id')
  .get(ProjectCtrl.findById)
  .put(ProjectCtrl.update)
  .delete(ProjectCtrl.delete);

app.use('/api', projects);

// API - User
users.route('/users')
  .get(userCtrl.findAll)
  .post(userCtrl.create);

users.route('/user/:email')
  .get(userCtrl.findByEmail);

app.use('/api', users);


// Main
app.get('/api', function (req, res) {
  res.send({
    app: 'node-test', 
    ver: '0.1.0',
    author: '@manudevelopia'
  });

});
