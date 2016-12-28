var mongoose = require('mongoose');
var Project = require('../models/project.js');

// GET all Projects from Databse
exports.findAllProjects = function(req, res){
  Project.find(function(req, projects){

    console.log('GET All Projects');
    res.status(200).jsonp(projects);
  });
};
