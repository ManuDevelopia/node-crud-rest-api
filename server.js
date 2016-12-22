const express = require('express');
const bodyParser = require('body-parser');

const mongoClient = require('mongodb').MongoClient;
var db;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile('/home/manu/Developer/Github/node-crud-test/www/index.html');
  var cursor = db.collection('projects').find();
});

app.post('/projects', (req, res) => {
  console.log(req.body); 
});

mongoClient.connect('mongodb://localhost:27017/local', (err, database) => {
  if (err){return console.log(err);}

  db = database;
  app.listen(3000, function (){
    console.log('Listening on port 3000');
  }); 
});
