/**
 *
 * @author  56477
 * @create 2018-05-30 13:46
 * @PROJECT_NAME staff - wlj
 * @note 请阐述当前文件的作用
 **/
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

app.put('/qyNative',function (req,res) {
    console.log(req);
    let callback=req.query['callback'];
    console.log(req.query['callback']);
    console.log(res);
    res.send(callback+'('+new Date().getTime()+',2)');
})

app.post('/kydc-zuul/login',function (req,res) {
    res.set("x-auth-token", "NTEzMDdjMjhmODk5MjQwYWNiMzU1NjY2MzUzMDU0NDI=");
    res.send({
        "code": 1,
        "msg": "SUCCESS",
        "data": "王利军"
    });
})
app.get('/kydc-zuul/userInfo',function (req,res) {
    res.send({
        "code": 1,
        "msg": "SUCCESS",
        "data": "王利军"
    });
})
app.get('/admin/api/staging/companyAudit',function (req,res) {
    fs.readFile('./FeHelper-20180508163419.json','utf8',function (err, data) {
        console.log(123);
        if(err) console.log(err);
        var test1=JSON.parse(data);
        res.send(test1);

    })
})
app.get('/report/manager/queryAll',function (req,res) {
    fs.readFile('./FeHelper-20180531114328.json','utf8',function (err, data) {
        console.log(123);
        if(err) console.log(err);
        var test1=JSON.parse(data);
        res.send(test1);

    })
})
app.get('/report/manager/queryById',function (req,res) {
    fs.readFile('./detailReport.json','utf8',function (err, data) {
        console.log(123);
        if(err) console.log(err);
        var test1=JSON.parse(data);
        res.send(test1);

    })
})
