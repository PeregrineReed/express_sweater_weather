var express = require('express');
var bcrypt = require('bcrypt');
var uuid = require('uuid/v4');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  if (req.body.password === req.body.password_confirmation) {
    User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      apiKey: uuid()
    })
  }
  res.send('respond with a resource');
});

module.exports = router;
