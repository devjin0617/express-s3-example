var express = require('express');
var router = express.Router();
var s3 = require('../lib/s3')
var moment = require('moment')
var hash = require('object-hash')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/s3/file', async function(req, res) {

  if (!req.files) {
    return res.status(400).send({
      success: false,
      msg: 'no files'
    })
  }
  
  var files = req.files;

  var keys = Object.keys(files)

  var file = files[keys[0]]

  var ext = file.name.split('.').slice(-1)[0]

  var filename = hash.MD5(file.md5 + (new Date().getTime())) + '.' + ext
  var path = moment().format('YYYY/MM/DD/')

  var result = await s3.upload({
    path: path + filename,
    file: file.data
  })

  res.send({
    success: true,
    data: {
      url: `https://s3.ap-northeast-2.amazonaws.com/${s3.bucketName}/${path}${filename}`
    }
  })

})

module.exports = router;
