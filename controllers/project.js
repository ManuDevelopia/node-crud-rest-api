

// Models
var Project = require('../models/project');
var User = require('../models/user');

// GET all Projects from Database
exports.findAll = function(req, res){
  Project.find(function(req, projects){
    res.status(200).jsonp(projects);
  });
};

// POST create a new Project
exports.create = function(req, res){
  var project = new Project({
    name: req.body.name,
    user: '586aa3dbbf8eaf0bfb99459b'
  });

  project.save(function (err, project){
    if (err){
      return res.send(500, err.message);
    }

    res.status(200).jsonp(project);
  });
}; 

// GET Project by ID
exports.findById = function(req, res){
  Project.findById(req.params.id, function(err, project){
    if (err){
      return res.send(500, err.message);
    }
    User.populate(project, {path: 'user'}, function(err, project){
      res.status(200).jsonp(project);
    }); 
  });
};

// GET Project by name
exports.findByName = function(req, res){
  Project.find({name: req.params.name}, function(err, project){
    if (err){
      return res.send(500, err.message);
    }

    res.status(200).jsonp(project);
  });
};

// POST Update a Project
exports.update = function(req, res){
  Project.findById(req.params.id, function(err, project){
    project.name = req.body.name;
  
    project.save(function(err, project){
    if (err){
      return res.send(500, err.message);
    }

    res.send(200).jsonp(project);
    });
  });

};

// DELETE Delete a Project
exports.delete = function (req, res) {
  Project.findById(req.params.id, function (err, project) {
    project.remove(function (err, project) {
      if (err) {
        return res.send(500, err.message);
      }

      res.status(200).jsonp(project);
    });
  });
};
