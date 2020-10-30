/**
 * javascript中，函数是一等公民，谁说也不好使
 * @type {number}
 * */

//函数绑定

this.x = 9;
var module = {
  x: 81,
  getX: function() {console.log(this.x); }
};

var module2 = {
  x:99
}

module.getX(); //

var newX = module.getX;
newX();//

var boundGetX = newX.bind(module);
boundGetX(); //

module.getX.bind(module2)();





//setTimeout 1

var func = {
  	func1: function() {
    		this.func2();
  	},
	 func2: function() {
	 	console.log("Im func2");
	 }
};

setTimeout(func.func1, 1000);
setTimeout(func.func1.bind(func), 2000);



//setTimeout 2

for(var i = 1; i <= 5; i++) {
  setTimeout(console.log.bind(console, i), i * 1000);
}
for(var i = 1; i <= 5; i++) {
    setTimeout(console.log, i * 1000,i);
}



//作为构造函数
//一般不这么用

function Con(x, y) {
   this.x = x;
   this.y = y;
}

Con.prototype.toString = function() {
   return this.x + ',' + this.y;
};

var NewCon = Con.bind(null, 0);
var  instance= new NewCon(5);
console.log(instance.toString());
console.log(instance instanceof Con); //true
console.log(instance instanceof NewCon); //true




//快捷调用

//不使用bind
var slice = Array.prototype.slice;
// ...
slice.apply(arguments);


//使用bind
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);
// ...
slice(arguments);
Array.prototype.slice.call(arguments);





//偏函数
//创建一个调用另外一个部分————参数或者变了已经预置的函数————的函数的用法。
//固化函数的一个或一些参数，从而产生一个新的函数。

// eg.1：
//判断一个数据的类型。number,boolean,string ,object,function..
var toString=Object.prototype.toString;
var isString=function (obj) {
    return toString.call(obj)=='[object String]';
}
var isFunction=function(obj){
    return toString.call(obj)=='[object Function]';
}

//重复定义一些相似的函数，是不是感觉很无聊？冗余？累了？OK，来个工厂吧
var isType=function (type) {
    return function (obj) {
        return toString.call(obj) == '[object '+type+']';
    };
}
var isString=isType('String');
var isFunction=isType('Function');



//eg.2:

var _={};
_.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
        if (--times < 1) { return func.apply(this, arguments); }
    };
};
//刘备同学三顾茅庐，诸葛先生就出山啦

var saveHanDynasty=function(){
    console.log('亮亮来啦');
    //TODO
}
var xuanDe=_.after(3,saveHanDynasty);
xuanDe();//叮咚~
xuanDe();//叮咚~
xuanDe();//叮咚~  亮亮来啦
//比如542  三个图表展示，下面的那三个如果有一个没数据 那么都不展示，只有三个都有数据了才同时出现 并展示。。。可用此方法
//应用场景  异步请求







function list() {
   return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); //

var list37 = list.bind(undefined, 37);//偏函数

var list2 = list37(); //
var list3 = list37(1, 2, 3); //






//函数柯里化
//将一个具有多个参数的函数，转换成能够通过一系列的函数链式调用

var add=function(x,y){
     return x+y;
}

var addCurried=function(x){
    return function(y){
        return x+y;
    }
}
addCurried(1)(2);//


//柯里化函数实现
var currying = function (fn) {
    var _args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, _args);
        }
        Array.prototype.push.apply(_args, [].slice.call(arguments));
        return arguments.callee;
    }
};

var newAdd = function(){
	var sum = 0;
	for(var i =0;i<arguments.length;i++){
		sum+=arguments[i];
	}
	return console.log(sum);
}

var addCurrying = currying(newAdd);
addCurrying(1)(2)(3)()//



//高阶函数
//可以把函数作为参数，或是将函数座位返回值的函数。
//除了通常意义的函数调用返回外，还形成了一种后续传递风格的结果接受方式，而非单一的返回值形式。
//后续传递风格的程序编写将函数的业务重点从返回值转移到了回调函数中
//eg:
[1,2,3,4,11,12,13,14].sort();
[1,2,3,4,11,12,13,14].sort(function (a,b) {
    return a-b;
})
//通过改动sort的方式，可以决定不同的排序方式，从这里就可以看出高阶函数的灵活性。
//forEach filter reduce,reduceRight,each,every ...ES5中数组定义的几个函数方法几乎都是高阶函数的使用
//延伸：事件绑定机制，绑定相同事件，注册不同的回调函数，可以灵活地处理业务逻辑。






//bind实现


Function.prototype.bind = function (context) {
    if (typeof this !== 'function') {
        throw new Error('what is trying to be bound is not callable')
    }
    var outArg = [...arguments].slice(1);
    var that = this; //保存this，即调用bind方法的目标函数
    var fNop = function () {
    };
    var bund = function () {
        var insideArg = [...arguments];
        var arg = outArg.concat(insideArg);
        return that.apply(this instanceof fNop && context ? this : context || window, arg);//这里的this是指的 新生成的函数调用的this 考虑到了构造函数这一说
    }
    fNop.prototype = this.prototype;
    bund.prototype = new fNop();
    return bund;
}


var func = {
    func1: function (x, y) {
      this.x=x;
      this.y=y
      console.log('这里是 xy 的结果-------------', x, y)
        this.func2();
    },
    func2: function (z) {
      this.z=z*2;
        console.log("Im func2");
    }
};

// setTimeout(func.func1, 1000);
// setTimeout(func.func1.bind(func), 2000);
var gouzao = func.func1.bind(func);
new gouzao();
