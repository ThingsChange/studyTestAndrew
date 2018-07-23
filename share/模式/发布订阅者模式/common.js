/**
 *
 * @author  56477
 * @create 2018-07-23 9:58
 * @PROJECT_NAME staff - wlj
 * @note 请阐述当前文件的作用
 **/
var event = {
  clientList:[],
  listen : function (key,fn) {
    if(!this.clientList[ key ]){
      this.clientList[ key ] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger:function () {
    var key = Array.prototype.shift.call(arguments),

      fns = this.clientList[ key ];

    if(!fns || fns.length===0){
      return false;
    }

    for (var i=0,fn;fn = fns[i++];){
      fn.apply(this,arguments);
    }
  }
};
//在定义一个instalEvent 函数，这个函数可以给所有的对象都动态安装发布订阅模式

var installEvent = function (obj) {
  for (var i in event){
    obj[i] = event[i];
  }
}

var salesOffices = {};

installEvent(salesOffices);

salesOffices.listen('squareMeter88',function (price) {   //小明订阅消息
  console.log("价格=" + price );
});


salesOffices.listen('squareMeter110',function (price) {   //小红订阅消息
  console.log("价格=" + price );
});

salesOffices.trigger('squareMeter88',2000000);
salesOffices.trigger('squareMeter110',3000000);
//取消订阅事件

event.remove = function (key,fn) {
  var fns = this.clientList[ key ];

  if( !fns ){ //如果key对应的消息没有被人订阅，则直接返回
    return false;
  }
  if( !fn ){ //如果传入的具体的回调函数，表示需要取消key对应消息的所有订阅
    fns && (fns.length=0);
  }else{
    for (var l = fns.length - 1;l >=0;l--){
      var _fn = fns[l];
      if(_fn === fn){
        fns.splice(l,1); //删除订阅者的回调函数
      }
    }
  }
}

var salesOffices = {};

installEvent(salesOffices);

// salesOffices.listen('squareMeter88',fn1 = function (price) {   //小明订阅消息
//   console.log("价格=" + price );
// });
//
//
// salesOffices.listen('squareMeter110',fn2 = function (price) {   //小红订阅消息
//   console.log("价格=" + price );
// });

// salesOffices.remove('squareMeter88',fn1); //删除小明的订阅
salesOffices.trigger('squareMeter110',2000000);
