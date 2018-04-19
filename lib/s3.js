var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var bucketName = 'express-s3-test'

module.exports = {
    instance: s3,
    bucketName: bucketName,
    create: (name) => {
        if (!name) {
            console.error('empty::bucket name')
            return;
        }
        s3.createBucket({Bucket: name}, function (err, data) {
            console.log('createBucket');
            if (err) {
                console.error('aws s3 connect error', err);
                return;
            }
            console.log('aws s3 connected');
        })
    },
    upload: (params) => {
        return s3.putObject({
            Bucket: bucketName,
            Key: params.path,
            ACL: 'public-read',
            Body: params.file,
            ContentLength: params.file.length,
        }).promise();
    }
}