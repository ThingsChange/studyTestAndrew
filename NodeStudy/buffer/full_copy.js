/**
 * Created by wanglijun on 2017/1/9.
 * 复制文件的完整饭，基础版请参见copy_mp4.js
 */
var fs = require('fs'),
    path=require('path'),
    out=process.stdout;
var filePath='../IMG_4269.MOV';
var readScream=fs.createReadStream(filePath);
var writeScream=fs.createWriteStream('IMG_4269.MOV');
var stat=fs.statSync(filePath)
var totalSize=stat.size;
var passedLength=0;
var lastSize=0;
var startTime=Date.now();
readScream.on('data',function (chunk) {
    passedLength+=chunk.length;
    if(writeScream.write(chunk)===false){
        readScream.pause();
    }
});
readScream.on('end',function () {
    writeScream.end();
})
readScream.on('erroe',function (err) {
    console.log('读取数据失败：'+err)
})
writeScream.on('drain',function () {
    readScream.resume();
})
setTimeout(function show() {
    var percent=Math.ceil((passedLength/totalSize)*100);
    var size=Math.ceil(passedLength/1000000);
    var diff=size-lastSize;
    out.clearLine(0);
    out.write('已完成'+size+'MB,'+percent+'%,速度：'+diff*2+'MB/s')
    if (passedLength<totalSize){
        setTimeout(show,500);
    }else{
        var endTime=Date.now();
        console.log();
        console.log('共用时： '+(endTime-startTime)/1000 +'秒')
    }
},500)

