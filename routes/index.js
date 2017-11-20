var express = require('express');
var router = express.Router();
var guest = require('../config/guest');
/* GET home page. */
router.get('/',guest, function(req, res, next) {
  res.render('index');
});

module.exports = router;
