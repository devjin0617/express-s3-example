var sharp = require('sharp')
var s3 = require('./s3')

module.exports = {
    createThumbnailWithS3Upload: async (params) => {
        console.log('create thumbnail...')
        var buffer = await sharp(params.file)
            .resize(100, 100)
            .toBuffer()
        console.log('created thumbnail!')
        console.log('thumbnail upload...')
        await s3.upload({
            path: params.path + '.thumb',
            file: buffer,
        })
        console.log('thumbnail succeess...')
    }
}