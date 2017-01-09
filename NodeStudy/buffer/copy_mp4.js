/**
 * Created by wanglijun on 2017/1/9.
 */
var fs=require('fs');
/*
var readStream=fs.createReadStream('IMG_4325.mp4');
var writeStream=fs.createWriteStream('copy_stream.mp4')

readStream.on('data',function (chunk) {
    if (writeStream.write(chunk)===false){//如果没有写完，暂停读取流
        console.log('still cached');
        readStream.pause();
    }
})
readStream.on('read',function () {//当没有数据时，关闭数据流
    writeStream.end();
})
writeStream.on('drain',function () {//写完后，继续读取
    console.log('data drains')
    readStream.resume()
})
*/
//pipe自动调用了data、end等事件
// fs.createReadStream('IMG_4325.mp4').pipe(fs.createWriteStream('copy_pipe.mp4'));


