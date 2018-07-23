/**
 *
 * @author  56477
 * @create 2018-07-23 9:56
 * @PROJECT_NAME staff - wlj
 * @note 请阐述当前文件的作用
 **/
var salesoffice = {}; //定义售楼处

salesoffice.clientList = []; //缓存列表，存放订阅者的回调函数

salesoffice.listen = function (key,fn) { //增加订阅者
  if(!this.clientList[key]){
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn); //订阅的消息添加进缓存列表
};

salesoffice.trigger = function () { //发布消息

  var key = Array.prototype.shift.call(arguments); //取出消息类型
  fns = this.clientList[key];
  if(!fns || fns.length ===0 ){ //如果没有订阅改消息，则返回

    return false;
  }

  for (var i = 0,fn;fn=fns[i++];){
    fn.apply(this,arguments); //arguments  是发布消息时带上的参数
  }
};

//测试例子
salesoffice.listen('squareMeter88',function (price) {   //小明订阅消息
  console.log("价格=" + price );
});


salesoffice.listen('squareMeter110',function (price) {   //小红订阅消息
  console.log("价格=" + price );
});

salesoffice.trigger('squareMeter88',2000000);
salesoffice.trigger('squareMeter110',3000000);
