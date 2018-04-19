var express = require('express');
var router = express.Router();
var s3 = require('../lib/s3')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
