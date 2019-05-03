var express = require('express');
var fetch = require('node-fetch');
var pry = require('pryjs');
var User = require('../../../models').User;

var router = express.Router();

router.post('/', function(req, res, next) {
  User.findOne({
    where: {
      apiKey: req.body.apiKey
    }
  }).then(user => {
    user.cities 
  }).then(results => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).send(JSON.stringify({message: `${req.body.location} has been added to your favorites`}))
  }).catch(error => {
    res.status(401).send({ error })
  })
});

router.get('/', function(req, res, next) {
  User.findOne({
    where: {
      apiKey: req.body.apiKey
    }
  }).then(user => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).send(user.cities)
  }).catch(error => {
    res.status(401).send({ error })
  })
});

module.exports = router;
