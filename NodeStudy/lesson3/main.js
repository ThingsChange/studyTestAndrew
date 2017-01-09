/**
 * Created by wanglijun on 2017/1/4.
 */
var express=require('express');
var utility=require('utility');

var app=express();
app.get('/',function (req,res) {
    var q=req.query.q;
    // 调用 utility.md5 方法，得到 md5 之后的值
    // 之所以使用 utility 这个库来生成 md5 值，其实只是习惯问题。每个人都有自己习惯的技术堆栈，
    // 我刚入职阿里的时候跟着苏千和朴灵混，所以也混到了不少他们的技术堆栈，仅此而已。
    // utility 的 github 地址：https://github.com/node-modules/utility
    // 里面定义了很多常用且比较杂的辅助方法，可以去看看
    var md5Value=utility.md5(q);
    res.add(md5Value);
})
app.listen(3000,function (req,res) {
    console.log("我在监听3000端口");

})