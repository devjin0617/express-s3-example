var express = require('express');
var router = express.Router();
var s3 = require('../lib/s3')


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

  var result = await s3.upload({
    path: file.name,
    file: file.data
  })

  console.log(result)

  res.send({
    success: true,
    data: {
      url: `https://s3.ap-northeast-2.amazonaws.com/${s3.bucketName}/${file.name}`
    }
  })

})

module.exports = router;
