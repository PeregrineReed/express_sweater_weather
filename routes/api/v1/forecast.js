var express = require('express');
var fetch = require('node-fetch');
var User = require('../../../models').User;

var router = express.Router();

router.get('/', async function(req, res, next) {
  var user = await User.findOne({
    where: {
      apiKey: req.body.apiKey
    }
  });

  const geocode = async () => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=AIzaSyDZXAjAoJTlZwO24HRUR1HNy-GkmdEx9fQ`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  var location = await geocode();
  var coordinates = location.results[0].geometry.location;

  const forecast = async () => {
    try {
      const response = await fetch(`https://api.darksky.net/forecast/821bdc0c5e50220cb45d84d29cbddbbb/${coordinates.lat},${coordinates.lng}`);
      const data = await response.json()
      return data;
    } catch (error) {
      return error;
    }
  };
  eval(pry.it);
  var weather = await forecast();
  res.setHeader("Content-Type", "application/json");
  if (user && user.apiKey === req.body.apiKey) {
    res.status(201).send(JSON.stringify(weather));
  } else {
    res.status(401).send(JSON.stringify({error: 'please log in to continue.'}));
  }
});

module.exports = router;
