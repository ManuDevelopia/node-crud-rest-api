const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

var projectCtrl = require('./controllers/project.js');
var projects = express.Router();

var userCtrl = require('./controllers/user.js');
var users = express.Router();

var connectorCtrl = require('./controllers/connector.js');
var connectors = express.Router();

const app = express();

// Port config
app.set('port', (process.env.PORT || 5000));

// DB
var localhostDb = 'mongodb://localhost:27017/local';
var deployDb = 'mongodb://heroku_s3c3ctz3:628bmaat4j5icjlm5cqe2qbseo@ds111589.mlab.com:11589/heroku_s3c3ctz3';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(deployDb, function(err, database) {
  if (err){
    return console.log(err);
  }

  app.listen(app.get('port'), function (){
    console.log('Listening on port ' + app.get('port'));
  });
});


// Headers to allow cross origin
app.use(function(req, res, next){
  // Website that wants to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// Routes

// Project
projects.route('/projects')
  .get(projectCtrl.findAll)
  .post(projectCtrl.create);

projects.route('/projects/:name')
  .get(projectCtrl.findByName);

projects.route('/project/:id')
  .get(projectCtrl.findById)
  .put(projectCtrl.update)
  .delete(projectCtrl.delete);

// Connector
connectors.route('/connectors')
  .get(connectorCtrl.findAll)
  .post(connectorCtrl.create);

connectors.route('/connector/:id')
  .get(connectorCtrl.findById);

connectors.route('/connector/:id')
  .put(connectorCtrl.update)
  .delete(connectorCtrl.delete);

// User
users.route('/users')
  .get(userCtrl.findAll)
  .post(userCtrl.create);

users.route('/user/:email')
  .get(userCtrl.findByEmail);


// Endpoints
app.use('/api', projects);
app.use('/api', connectors);
app.use('/api', users);


// Main
app.get('/', function (req, res) {
  res.send({
    app: 'node-test',
    ver: '0.1.0',
    author: '@manudevelopia',
    github: 'http://',
    heroku: 'http://'
  });

});
