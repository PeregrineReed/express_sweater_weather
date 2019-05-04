var express = require('express');
var fetch = require('node-fetch');
var User = require('../../../models').User;
var City = require('../../../models').City;
var pry = require('pryjs')

var router = express.Router();

router.get('/', async function(req, res, next) {
  var user = await User.findOne({
    where: {
      apiKey: req.body.apiKey
    }
  });

  const geocode = async () => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GEOCODE_KEY}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  var location = await geocode();
  var city = await City.findOrCreate({
    where: {
      name: location.results[0].address_components[0].long_name,
      state: location.results[0].address_components[2].short_name,
      country: location.results[0].address_components[3].long_name
    },
    defaults: {
      name: location.results[0].address_components[0].long_name,
      state: location.results[0].address_components[2].short_name,
      country: location.results[0].address_components[3].long_name,
      lat: location.results[0].geometry.location.lat,
      long: location.results[0].geometry.location.lng
    },
  });

  const forecast = async () => {
    try {
      const response = await fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${city[0].lat},${city[0].long}`);
      const data = await response.json()
      return data;
    } catch (error) {
      return error;
    }
  };
  var weather = await forecast();
  res.setHeader("Content-Type", "application/json");
  if (user && user.apiKey === req.body.apiKey) {
    res.status(201).send(JSON.stringify({
      city: city[0].name + ', ' + city[0].state + ', ' + city[0].country,
      currently: weather.currently,
      hourly: weather.hourly,
      daily: weather.daily
    }));
  } else {
    res.status(401).send(JSON.stringify({error: 'please log in to continue.'}));
  }
});

module.exports = router;
