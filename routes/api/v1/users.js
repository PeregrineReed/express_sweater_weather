var express = require('express');
var bcrypt = require('bcrypt');
var uuid = require('uuid/v4');
var User = require('../../../models').User;

var router = express.Router();

router.post('/', function(req, res, next) {
  if (req.body.password === req.body.passwordConfirmation) {
    User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      apiKey: uuid()
    })
    .then(user => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify({apiKey: user.apiKey}))
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(409).send({ error });
    })
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(409).send(JSON.stringify({
      error: "password and password confirmation don't match."
    }));
  }
});

module.exports = router;
