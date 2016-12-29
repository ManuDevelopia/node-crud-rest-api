var mongoose = require('mongoose');
var Project = require('../models/project.js');

// GET all Projects from Databse
exports.findAll = function(req, res){
  Project.find(function(req, projects){
    res.status(200).jsonp(projects);
  });
};

// GET Project by ID
exports.findById = function(req, res){
  console.log('Petition for id: ' + req.params.id);
  Project.findById(req.params.id, function(err, project){
    if (err){
      return res.send(500, err.message);
    }
  
    res.status(200).jsonp(project);
  });
};

// POST create a new Project
exports.create = function(req, res){
  var project = new Project({
    name: req.body.name
  });

  project.save(function (err, project){
    if (err){
      return res.send(500, err.message);
    }

    res.status(200).jsonp(project);
  });
}; 
