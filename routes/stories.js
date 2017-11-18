var express = require('express');
var router = express.Router();
var auth = require('../config/auth');

/* GET home page. */
router.get('/dashboard',auth, function(req, res, next) {
  res.render('dashboard');
});

module.exports = router;
