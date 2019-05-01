var express = require('express');
// var fetch = require('node-fetch');
// var City = require('../../../models').City;
var pry = require('pryjs');

var router = express.Router();

router.get('/', function(req, res, next) {
// router.get('/', async function(req, res, next) {
//   const geocode = async () => {
//     try {
//       const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=AIzaSyDZXAjAoJTlZwO24HRUR1HNy-GkmdEx9fQ`);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return error;
//     }
//   };
//   results = await geocode();
//   coordinates = results.results[0].geometry.location;

  eval(pry.it);
  // City.findOne({
  //   where: {
  //     name: req.query.location
  //   }
  // })
  // .then(user => {
  //   res.setHeader("Content-Type", "application/json");
  //   res.status(201).send(JSON.stringify({data: 'forecast'}))
  // })
  // .catch(error => {
  //   res.setHeader("Content-Type", "application/json");
  //   res.status(401).send({ error });
  // });
  res.send('forecast')
});

module.exports = router;
