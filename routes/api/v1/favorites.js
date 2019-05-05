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
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.location}&key=${process.env.GEOCODE_KEY}`);
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
      CityId: city[0].id
    },
    defaults: {
      UserId: user.id,
      CityId: city[0].id
    }
  });

  res.setHeader("Content-Type", "application/json");
  if (user && favorite && user.apiKey === req.body.apiKey) {
    res.status(201).send(JSON.stringify({
      message: `${city[0].name}, ${city[0].state}, ${city[0].country} has been added to your favorites.`
    }));
  } else {
    res.status(401).send(JSON.stringify({error: 'Something went wrong.'}))
  };
});

router.get('/', async function(req, res, next) {
  var user = await User.findOne({
    where: {
      apiKey: req.body.apiKey
    }
  });

  const forecast = async (lat, long) => {
    try {
      const response = await fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${lat},${long}`);
      const data = await response.json()
      return data;
    } catch (error) {
      return error;
    }
  };

  var cities = await user.getCities()
  var favorites = []
  for (let count = 0; count < cities.length; count++) {
    let weather = await forecast(cities[count].lat, cities[count].long)
    favorites.push({
      id: cities[count].id,
      name: cities[count].name,
      state: cities[count].state,
      country: cities[count].country,
      lat: cities[count].lat,
      long: cities[count].long,
      currentForecast: weather.currently
    });
  };

  res.setHeader("Content-Type", "application/json")
  if (user && user.apiKey === req.body.apiKey) {
    res.status(200).send(JSON.stringify({ favorites: favorites }))
  } else {
    res.status(401).send({ error })
  };
});

router.delete('/', async function(req, res, next) {
  var user = await User.findOne({
    where: {
      apiKey: req.body.apiKey
    }
  });

  var city = await City.findOne({
    where: {
      name: req.body.location.split(", ")[0],
      state: req.body.location.split(", ")[1],
      country: req.body.location.split(", ")[2]
    }
  });

  var favorite = await UserCity.destroy({
    where: {
      UserId: user.id,
      CityId: city.id
    }
  });
  res.setHeader("Content-Type", "application/json");
  if (user && user.apiKey === req.body.apiKey) {
    res.status(201).send(JSON.stringify({
      message: `${city.name}, ${city.state}, ${city.country} has been removed from your favorites.`
    }));
  } else {
    res.status(401).send(JSON.stringify({error: 'Something went wrong.'}))
  };
});

module.exports = router;
