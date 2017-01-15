const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

var ProjectCtrl = require('./controllers/project.js');
var projects = express.Router();

var userCtrl = require('./controllers/user.js');
var users = express.Router();

var connectorCtrl = require('./controllers/connector.js');
var connectors = express.Router();

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://heroku_s3c3ctz3:628bmaat4j5icjlm5cqe2qbseo@ds111589.mlab.com:11589/heroku_s3c3ctz3', function(err, database) {
  if (err){
    return console.log(err);
  }

  app.listen(app.get('port'), function (){
    console.log('Listening on port 3000');
  });
});

// TODO:  Application Rest API and Public API must be separed !!!

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


// Connector
connectors.route('/connectors')
  .get(connectorCtrl.findAll)
  .post(connectorCtrl.create);

//connectors.route('/connector/:id')
//  .delete(connectorCtrl.delete);

app.use('/api', connectors);

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
