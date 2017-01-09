/**
 * Created by wanglijun on 2016/12/29.
 */
var express = require('express');
var url=require('url');

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