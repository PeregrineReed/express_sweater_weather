var express = require('express');
var bcrypt = require('bcrypt');
var User = require('../../../models').User;

var router = express.Router();

router.post('/', function(req, res, next) {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    res.setHeader("Content-Type", "application/json");
    if (bcrypt.compareSync(req.body.password, user.password) === true) {
      res.status(201).send(JSON.stringify({apiKey: user.apiKey}))
    } else {
      res.status(401).send(JSON.stringify({error: 'incorrect email or password.'}))
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(409).send({ error });
  });
});

module.exports = router;
