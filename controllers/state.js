//noinspection JSUnusedLocalSymbols
var mongoose = require('mongoose');

var State = require('../models/state');
var Metric = require('../models/metric');

// GET All States
exports.findAll = function(req, res){
  State.find(function(req, state){
    res.status(200).jsonp(state);
  });
};

// GET Project by ID
exports.findById = function(req, res){
  State.findById({_id: req.params.id})
    .populate('metrics')
    .exec(function(err, state){
      if (err){
        return res.send(500, err.message);
      }

      res.status(200).jsonp(state);
    });
};

// POST Create a new State
exports.create = function(req, res){
  var state = new State({
    date: new Date(),
    name: req.body.name,
    endpoint: req.body.endpoint,
    connectors: req.body.connectors
  });

  state.save(function(err, state){
    if (err){
      res.send(500, err.message);
    }

    res.status(200).jsonp(state);
  });
};

// PUT Updates a State
exports.update = function(req, res){
  State.findById(req.params.id, function(err, state){
    state.name = req.body.name;
    state.endpoint = req.body.endpoint;
    state.connectors = req.body.connectors;

    state.save(function(err, state){
      if (err){
        return res.send(500, err.message);
      }

      res.sendStatus(200);
    });
  });
};


// DELETE Delete a Project
exports.delete = function (req, res) {
  State.findById(req.params.id, function (err, state) {
    state.remove(function (err, state) {
      if (err) {
        return res.send(500, err.message);
      }

      res.status(200).jsonp(state);
    });
  });
};
