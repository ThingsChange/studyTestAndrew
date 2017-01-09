/**
 * Created by wanglijun on 2017/1/9.
 */
var fs = require('fs');
var readStream = fs.createReadStream('buffer_image.js');
var n=0;
readStream.on('data', function (chunk) {
        console.log('data emits')
        console.log(Buffer.isBuffer(chunk))
         n++;
        // console.log(chunk.toString('utf8'))//此处默认就是utf8,所以可以不写
    readStream.pause();
    console.log('data pause')
    setTimeout(function () {
        console.log('data pause end');
        readStream.resume();
    },3000)
    })
    .on('readable', function () {
        console.log('data readable');
    })
    .on('end', function () {
        console.log('data ends');
        console.log('n==='+n)
    }).on('error', function (e) {
        console.log('data read error ' + e)
})