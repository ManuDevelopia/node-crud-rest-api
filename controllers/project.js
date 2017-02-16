

// Models
var Project = require('../models/project');
var User = require('../models/user');
var Connector = require('../models/connector');

// GET all Projects from Database
exports.findAll = function(req, res){
  Project.find(function(req, projects){
    res.status(200).jsonp(projects);
  });
};

// POST create a new Project
exports.create = function(req, res){
 // TODO: remove this harcode
  var connectorArray = [];
  var connector1 = new Connector({
      name: 'Connector 1',
      endpoint: 'http://connector.es/api/project1'
    });
  connector1.save();
  var connector2 = new Connector({
      name: 'Connector 2',
      endpoint: 'http://connector.es/api/project2'
    });
  connector1.save();
  var connector3 = new Connector({
      name: 'Connector 3',
      endpoint: 'http://connector.es/api/project3'
    });
  connector1.save(); 
  connector2.save(); 
  connector3.save(); 
  
  connectorArray.push(connector1);
  connectorArray.push(connector2);
  connectorArray.push(connector3);
    
  var project = new Project({
    name: req.body.name,
    user: '58a49a5eb8929469ea88927a',
    url: req.body.url,
    connectors: connectorArray
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

    res.sendStatus(200);
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
