/**
 * Created by wanglijun on 2017/1/3.
 */

var http = require('http');
var querystring=require('querystring');
var postData=querystring.stringify({
    'ie':'utf-8',
    'kw':'魔兽世界',
    'fid':'73787',
    'tid':'4925131373',
    'vcode_md5':'',
    'floor_num':19,
    'rich_text':1,
    'tbs':'3a1bc92d1526a96d1483411900',
    'content':'你他妹的倒是说啊',
    'files':[],
    'mouse_pwd':'23,21,17,13,21,17,18,18,40,16,13,17,13,16,13,17,13,16,13,17,13,16,13,17,13,16,13,17,40,19,21,24,25,25,40,16,24,19,17,13,16,17,25,17,14834119043330',
    'mouse_pwd_t':'1483411904333',
    'mouse_pwd_isclick':0,
    '__type__':'reply'
});
var options={
    hostname:'http://tieba.baidu.com',
    port:'80',
    path:'/f/commit/post/add',
    method:'POST',
    header:{
         'Accept':'application/json, text/javascript',
         'Accept-Encoding':'gzip, deflate',
         'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
         'Connection':'keep-alive',
         'Content-Length':postData.length,
         'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
         'Cookie':'BAIDUID=D26C6A13556A9AD7422F0BF1997762A2:FG=1; BIDUPSID=D26C6A13556A9AD7422F0BF1997762A2; PSTM=1482741086; TIEBA_USERTYPE=9d9e5623a2a45d75e5aa6ee7; bdshare_firstime=1483061617158; BDUSS=FFVNElmbFJGfkwyRXhTcHdqMmczdnNaY1pjU1N5cXJRdU9Nb0p6bk0yMGRqNDFZSVFBQUFBJCQAAAAAAAAAAAEAAAAiqTM10rnPrtTCuawAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0CZlgdAmZYM; STOKEN=8863dade2f421749ed2de047cd977793dc7de8e8f3fba48999eff7de8451396d; TIEBAUID=e23d39f3b3885dd262d3e810; MCITY=-131%3A; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; PSINO=1; H_PS_PSSID=1465_19034_21098_17001_21553_21615_20930; wise_device=0',
         'Host':'tieba.baidu.com',
         'Origin':'http://tieba.baidu.com',
         'Referer':'http://tieba.baidu.com/p/4925131373',
         'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
         'X-Requested-With':'XMLHttpRequest'
    }
};
var req = http.request(options,function (res) {
    console.log('Status:  '+res.statusCode);
    console.log('headers:  '+JSON.stringify(res.headers));
    res.on('data',function (chunk) {
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
    });
    res.on('end',function () {
        console.log('评论完毕！');
    });
})
req.on('error',function (e) {
    console.log('Error1: '+e.message);
})
req.write(postData);
req.end();
