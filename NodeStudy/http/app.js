/**
 * Created by wanglijun on 2016/12/29.
 */
var express = require('express');
var bodyParser=require("body-parser");
var url=require('url');
let fs=require('fs');
var  doSomeThing=function () {
    new Date().getTime();
}
var app=new express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.get('/',function (req,res) {
    res.send('hello, qingyun');
});
app.post('/login',function(req,res){
    console.log(req.query);
    console.log(req.body);
    let params=req.body;
    if(params.name=='q'&&params.pwd=='123'){
        res.send({
            loginStatus:true,
            code:10000,
            message:'登陆成功'
        })
    }else{
        res.send({
            loginStatus:false,
            code:10001,
            message:'用户名或密码错误'
        })
    }
})
app.get('/lewen',function (req,res) {
    res.send('hello, Lewen,do you finish your work?');
});
app.listen('3000',function () {
    console.log("app is listening  at 3000");
})
app.get('/qy',function (req,res) {
    let callback=req.query['callback'];
    console.log(req.query['callback']);
    res.send(callback+'('+new Date().getTime()+')');
})
app.all('*', function(req, res, next) {
    res.set("Access-Control-Allow-Origin", "http://localhost:8080");
    res.set("Access-Control-Allow-Headers", "X-Custom-Header");
    res.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.set("X-Powered-By",' 3.2.1')
    res.set("Content-Type", "application/json;charset=utf-8");
    next();
});
app.put('/qyNative',function (req,res) {
    console.log(req);
    let callback=req.query['callback'];
    console.log(req.query['callback']);
    console.log(res);
    res.send(callback+'('+new Date().getTime()+',2)');
})
app.get('/qyNativeJquery',function (req,res) {
    res.set("Access-Control-Allow-Origin", "http://localhost:8080");
    let callback=req.query['callback'];
    console.log(callback);
    // console.log(res);
    res.send(callback+'('+new Date().getTime()+',2)');
})
app.get('/admin/api/staging/companyAudit',function (req,res) {
/*    console.log(1234);
    // res.setHeader("Access-Control-Allow-Origin", "http://www.lnckk.com");
    let callback=req.query['callback'];
    console.log(req.query['callback']);
    res.send(callback+'('+new Date().getTime()+',2)');*/
    fs.readFile('./FeHelper-20180508163419.json','utf8',function (err, data) {
        console.log(123);
        if(err) console.log(err);
        var test1=JSON.parse(data);
        res.send(test1);

    })
})
