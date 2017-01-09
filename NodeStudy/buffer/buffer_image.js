/**
 * Created by wanglijun on 2017/1/9.
 */
var fs=require('fs');
/*fs.readFile();  异步
fs.readFileSync() 同步 */
fs.readFile('test.jpg',{},function (er,origin_buffer) {
    Buffer.isBuffer(origin_buffer);
    console.log(    Buffer.isBuffer(origin_buffer));
    fs.writeFile('test_buffer.jpg',origin_buffer,function (err) {
        if (err) console.log(err);
    })
    var base64Image=origin_buffer.toString('base64');
    console.log(base64Image);
    var decodedImage = new Buffer(base64Image,'base64');
    console.log(Buffer.compare(origin_buffer,decodedImage));
    fs.writeFile('test_decoded.jpg',decodedImage,function (err) {
        if (err) console.log(err);
    })

})