var Metric = require('../models/metric');

exports.findAll = function(req, res){
  Metric.find(function(req, metrics){
    res.status(200).jsonp(metrics);
  });
};

// GET Metric by ID
exports.findById = function(req, res){
  Metric.findById(req.params.id, function(err, metric){
    if (err){
      return res.send(500, err.message);
    }
  
    res.status(200).jsonp(metric);
  });
};

// GET Metric by email
exports.findByEmail = function(req, res){
  Metric.findById({email: req.params.email}, function(err, metric){
    if (err){
      return res.send(500, err.message);
    }
  
    res.status(200).jsonp(metric);
  });
};


// POST Update a Metric
exports.update = function(req, res){
  Metric.findById(req.params.id, function(err, metric){
    metric.name = req.body.name;
  
    metric.save(function(err, metric){
    if (err){
      return res.send(500, err.message);
    }

    res.sendStatus(200);
    });
  });

};

// POST Create Metric
exports.create = function(req, res){
  var metric = new Metric({
    name: req.body.name,
    value: req.body.value
  });

  metric.save(function(err, metric){
    if (err){
      return res.send(500, err.message);
    }

    res.status(200).jsonp(metric);
  });
};

// DELETE Delete a Metric
exports.delete = function (req, res) {
  Metric.findById(req.params.id, function (err, metric) {
    metric.remove(function (err, metric) {
      if (err) {
        return res.send(500, err.message);
      }

      res.status(200).jsonp(metric);
    });
  });
};
