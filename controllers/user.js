var User = require('../models/user');

exports.findAll = function(req, res){
  User.find(function(req, users){
    res.status(200).jsonp(users);
  });
};

// GET Project by ID
exports.findById = function(req, res){
  User.findById(req.params.id, function(err, user){
    if (err){
      return res.send(500, err.message);
    }
  
    res.status(200).jsonp(user);
  });
};

exports.create = function(req, res){
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: require('crypto')
                .createHash('sha1')
                .update(req.body.password)
                .digest('base64')
  });

  user.save(function(err, user){
    if (err){
      return res.send(500, err.message);
    }

    res.status(200).jsonp(user);
  });
};
