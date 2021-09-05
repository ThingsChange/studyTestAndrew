/**
 * Created by wanglijun on 2016/12/29.
 */
var express = require('express');
const request = require('request')
var bodyParser=require("body-parser");
var url=require('url');
let fs=require('fs');
var  doSomeThing=function () {
    new Date().getTime();
}
let urlPre= 'https://dohko.m.hualala.com'
const router = express.Router();
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
app.get('/withToken',function(req,res){

    request(
      {url: 'https://api.xinrenxinshi.com/v2/login/loginWithToken?appKey=apprBPmEDqY638774&email=0rQA8B3KI%2FWWdppLL27V2nv5lUQFVqRTopMN5o7RyFI%3D&employeeId=l80yYoFvlNI4AUgVF9lmVC4a8MDsQ22MD3iY9GOeZUB7%2BZVEBVakU6KTDeaO0chS&mobile=41Guj61egdQe%2Btjaw%2BBoEg%3D%3D&timestamp='+new Date().getTime()+'&token=SRX0EkGqwRgAdxaaugPpbgIxzTeqFLqWEA3s5SGksYR7%2BZVEBVakU6KTDeaO0chS&sign=xqFfO2PK2nhlpoAWgQU%2FOpLnTd0%3D'}
    ,function(error, response, body) {
        console.log('这里是  response.statusCode  的结果-------------',  response.statusCode )
        res.send(body)
        if (!error && response.statusCode == 200) {
          console.log(body) // 请求成功的处理逻辑
          res.send(body)
        }
      }
    )
})
app.get('/orh5/base/getNational',function (req,res) {
  var url='https://e.xinrenxinshi.com/attendance/ajax-sign';
  var requsetData={form: {"longitude":116.34656566266509,"latitude":39.940029770247655,"accuracy":"65","timestamp":1572858283530,"signature":"VSxSFNCwEz6oLDMahv0gBPyMSt8=","macAddr":"44:6a:2e:a:f1:77"}};
  request({
    url: url,
    method: "POST",
    json: true,
    headers: {
      "X-CSRF-TOKEN": "ZmZkNzJhNzNRBVFVAgQDBlJfVVIGVwcGXlRQUgpZAARTXgJRVgMBAg==",
      "content-type": "application/json;charset=UTF-8",
      Cookie:'sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2215c1e82375874aa893c55165998c4697%22%2C%22%24device_id%22%3A%2216b887206ce3b1-0ac70550a88785-215e490f-304500-16b887206cf116c%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%2216b887206ce3b1-0ac70550a88785-215e490f-304500-16b887206cf116c%22%7D; QJYDSID=cc12a1f77f004190a8d12ddbbdc32103_15c1e82375874aa893c55165998c4697; sa_jssdk_2015_e_xinrenxinshi_com=%7B%22distinct_id%22%3A%2215c1e82375874aa893c55165998c4697%22%2C%22first_id%22%3A%2216e1c422913af4-05b1c64232e4e28-215e490f-304500-16e1c422914ff8%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%7D; sa_jssdk_2015_e=%7B%22distinct_id%22%3A%2215c1e82375874aa893c55165998c4697%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%2216be380256381e-00ac4a76491fab-215e490f-304500-16be380256411a8%22%7D', //这里是登陆后得到的cookie,(重点
    },
    body: JSON.stringify(requsetData)
  }, function(error, response, body) {
    console.log('这里是  response.statusCode  的结果-------------',  response.statusCode )
    res.send(body)
    if (!error && response.statusCode == 200) {
      console.log(body) // 请求成功的处理逻辑
      res.send(body)
    }
  });
  // request.post('https://e.xinrenxinshi.com/attendance/ajax-sign',
  //   {form: {"longitude":116.34656566266509,"latitude":39.940029770247655,"accuracy":"65","timestamp":1572858283530,"signature":"VSxSFNCwEz6oLDMahv0gBPyMSt8=","macAddr":"44:6a:2e:a:f1:77"}},
  //   function(error, response, body) {
  //     console.log('这里是 error 的结果-------------', error, response, body)
  //
  //     let end = new Date()
  //     if (!error && response.statusCode === 200) {
  //       body = JSON.parse(body)
  //       if (body.success) {
  //       } else {
  //       }
  //     }
  //   }
  // )
  // res.send(500,{code:'000',msg:'错了',data:{}})
});
app.post('/orh5/shop/getBusinessSetting',function (req,res) {
  res.set("Access-Control-Allow-Origin", "https://dohko.m.hualala.com");
  res.set("Access-Control-Allow-Credentials", true);
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token,x-abc,x-b3-spanid");
  res.status(200).send({code:'000',msg:'错了a',data:{}})
  // res.send(302,'www.baidu.com')
  // res.redirect('/qyNativeJquery')
});
app.listen('3000',function () {
    console.log("app is listening  at 3000");
})
app.all('*', function(req, res, next) {
    res.set("Access-Control-Allow-Origin", "https://dohko.m.hualala.com");
    res.set("Access-Control-Allow-Credentials", true);
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token,x-abc,x-b3-spanid,auth-type,x-b3-traceid");
    res.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.set("X-Powered-By",' 3.2.1')
    res.set("Content-Type", "application/json;charset=UTF-8");
    // res.set("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    next();
});
app.get('/qy',function (req,res) {
  res.send('hello, Lewen,do you finish your work?');
});
app.get('/abc',function (req,res) {
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
app.get('/qyNativeJquery',function (req,res) {
    res.set("Access-Control-Allow-Origin", "https://dohko.m.hualala.com");
    let callback=req.query['callback'];
    console.log(callback);
    // console.log(res);
    res.send(callback+'('+new Date().getTime()+',3)');
})
app.get('/shop/info',function (req,res) {
  fs.readFile('./shopInfo.json','utf8',function (err, data) {
    console.log(123);
    if(err) console.log(err);
    const shopInfo= JSON.parse(data);
    res.send(shopInfo);

  })
})
app.put('/shop/info',function (req,res) {
  fs.readFile('./shopInfo.json','utf8',function (err, data) {
    console.log(123);
    if(err) console.log(err);
    const shopInfo= JSON.parse(data);
    delete shopInfo.data.shopPromotions;
    res.send(shopInfo);
  })
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
router.get('/test',(req,res,next)=>{
  console.log('这里是 test1 的结果-------------', 'test1')
  next();
  // res.end()
})
router.get('/test',(req,res,next)=>{
  console.log('这里是 test2 的结果-------------', 'test2')
  // next('345')
  // res.send('123')
  next('route')//如果用了这个，test2-2不会输出;
  // next(!'route')//如果用了这个，后续正常
  // next('da')//如果用了这个，'da'会被error捕获
},function (req,res,next){
  console.log('这里是 test2-2 的结果-------------', 1)
  next(!'route');
})
router.get('/test',(req,res,next)=>{
  console.log('这里是 test3 的结果-------------', 123)
  next()
})
app.use('/',router)
app.use(function(err, req, res, next) {
  let result =
    process.env.NODE_ENV === "development"
      ? {
        error: {
          message: err.message,
          name: error.name,
          stack: err.stack
        }
      }
      : {};
  console.log('这里是 err 的结果-------------', err)
  res.status(err.status || 500);
  res.json(result);
});
