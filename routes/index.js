var express = require('express');
var router = express.Router();
var s3 = require('../lib/s3')
var moment = require('moment')
var hash = require('object-hash')
var imageLib = require('../lib/image')

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

  files = files[keys[0]]

  async function next(params) {
    var response = s3.upload({
      path: params.path + params.filename,
      file: params.file.data,
      contentType: params.file.mimetype
    })

    imageLib.createThumbnailWithS3Upload({
      file: params.file.data,
      name: params.filename,
      path: params.path + params.filename,
      contentType: params.file.mimetype
    })

    return response
  }

  var result = []
  var path = moment().format('YYYY/MM/DD/')
  var filename
  var url
  if (Array.isArray(files)) {
    for(i in files) {
      var file = files[i]
      var ext = file.name.split('.').slice(-1)[0]
      filename = hash.MD5(file.md5 + (new Date().getTime())) + '.' + ext
      console.log('file upload...')
      await next({
        file: file,
        path: path,
        filename: filename
      })
      console.log('file upload success!')
      url = `https://s3.ap-northeast-2.amazonaws.com/${s3.bucketName}/${path}${filename}`
      result.push({
        url: url,
        thumbnail: url + '.thumb'
      })
    }
  } else {
    var file = files
    console.log(file)
    var ext = file.name.split('.').slice(-1)[0]
    filename = hash.MD5(file.md5 + (new Date().getTime())) + '.' + ext
    console.log('file upload...')
    await next({
      file: file,
      path: path,
      filename: filename
    })
    console.log('file upload success!')
    url = `https://s3.ap-northeast-2.amazonaws.com/${s3.bucketName}/${path}${filename}`
    result.push({
      url: url,
      thumbnail: url + '.thumb'
    })
  }
  
  res.send({
    success: true,
    data: {
      list: result
    }
  })

})

module.exports = router;
