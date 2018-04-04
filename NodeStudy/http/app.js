/**
 * Created by wanglijun on 2016/12/29.
 */
var express = require('express');
var url=require('url');
var  doSomeThing=function () {
    new Date().getTime();
}
var app=new express();
app.get('/',function (req,res) {
    res.send('hello, qingyun');
});
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

app.get('/qyNative',function (req,res) {
    // res.setHeader("Access-Control-Allow-Origin", "http://www.lnckk.com");
    let callback=req.query['callback'];
    console.log(req.query['callback']);
    res.send(callback+'('+new Date().getTime()+',2)');
})


