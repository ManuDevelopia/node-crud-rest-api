var mongoose = require('mongoose');

var Connector = require('../models/connector')

// GET All Conncetors
exports.findAll = function(req, res){
  Connector.find(function(req, connector){
    res.status(200).jsonp(connector);
  });
};

// POST Create a new Connector
exports.create = function(req, res){
  var connector = new Connector({
    name: req.body.name,
    endpoint: req.body.endpoint
  });

  connector.save(function(err, connector){
    if (err){
      res.send(500, err.message);
    }

    res.status(200).jsonp(connector);
  });
};
