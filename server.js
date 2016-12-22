const express = require('express');
const bodyParser = require('body-parser');

const mongoClient = require('mongodb').MongoClient;
var db;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoClient.connect('mongodb://localhost:27017/local', (err, database) => {
  if (err){return console.log(err);}

  db = database;
  app.listen(3000, function (){
    console.log('Listening on port 3000');
  }); 
});

app.get('/', function (req, res) {
  res.send({
    app: 'node-test', 
    ver: '0.1.0',
    author: '@manudevelopia'
  });
});

app.post('/projects', (req, res) => {
  console.log(req.body); 
});
