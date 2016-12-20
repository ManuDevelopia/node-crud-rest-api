const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function (){
  console.log('Listening on port 3000');
});

app.get('/', function (req, res) {
  res.sendFile('/home/manu/Developer/Github/node-crud-test/www/index.html');
});

app.post('/', (req, res) => {
 console.log(req.body); 
});
