const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
var db;

var ProjectCtrl = require('./controllers/project.js');
var projects = express.Router();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/local', (err, database) => {
  if (err){return console.log(err);}

  db = database;
  app.listen(3000, function (){
    console.log('Listening on port 3000');
  }); 
});

// API
//projects.route('/projects').get(ProjectCtrl.findAllProjects);
app.get('/projects', ProjectCtrl.findAllProjects);



app.get('/', function (req, res) {
  res.send({
    app: 'node-test', 
    ver: '0.1.0',
    author: '@manudevelopia'
  });

});

app.get('/project', function (req, res){
  res.sendFile('/home/manu/Developer/Github/node-crud-rest-api/www/index.html');
});

app.post('/projects', (req, res) => {
  db.collection('projects').save(req.body, (err, result) =>{
    if (err) return console.log(err);
  });

  console.log('Saved in database');
  res.redirect('/');

});
