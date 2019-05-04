var express = require('express');
var fetch = require('node-fetch');
var pry = require('pryjs');
var User = require('../../../models').User;
var City = require('../../../models').City;
var UserCity = require('../../../models').UserCity;

var router = express.Router();

router.post('/', async function(req, res, next) {
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

  var favorite = await UserCity.findOrCreate({
    where: {
      UserId: user.id,
      CityId: city.id
    },
    defaults: {
      UserId: user.id,
      CityId: city.id
    }
  })

  res.setHeader("Content-Type", "application/json");
  if (user && user.apiKey === req.body.apiKey) {
    res.status(201).send(JSON.stringify({
      message: `${city.name}, ${city.state}, ${city.country} has been added to your favorites.`
    }));
  } else {
    res.status(401).send(JSON.stringify({error: 'Something went wrong'}))
  }
});

router.get('/', function(req, res, next) {
  User.findOne({
    where: {
      apiKey: req.body.apiKey
    }
  }).then(user => {
    return user.getCities()
  }).then(cities => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).send(JSON.stringify({ favorites: cities }))
  }).catch(error => {
    res.status(401).send({ error })
  })
});

module.exports = router;
