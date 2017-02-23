//noinspection JSUnusedLocalSymbols
var mongoose = require('mongoose');

var Connector = require('../models/connector');

// GET All Connectors
exports.findAll = function(req, res){
  Connector.find(function(req, connector){
    res.status(200).jsonp(connector);
  });
};

// GET Project by ID
exports.findById = function(req, res){
  Connector.findById(req.params.id, function(err, connector){
    if (err){
      return res.send(500, err.message);
    }
    
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

// PUT Updates a Project
exports.update = function(req, res){
  Connector.findById(req.params.id, function(err, connector){
    connector.name = req.body.name;

    connector.save(function(err, project){
      if (err){
        return res.send(500, err.message);
      }

      res.sendStatus(200);
    });
  });
}


// DELETE Delete a Project
exports.delete = function (req, res) {
  Connector.findById(req.params.id, function (err, connector) {
    connector.remove(function (err, connector) {
      if (err) {
        return res.send(500, err.message);
      }

      res.status(200).jsonp(connector);
    });
  });
};
