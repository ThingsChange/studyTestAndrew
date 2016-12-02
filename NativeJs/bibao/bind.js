/**
 * Created by Andrew on 2016/11/19.
 * 模拟bind 函数的实现
 * bind：声明一个函数，不管怎么调用  都有相同的this值。
 * eg:fuc.bind(a,1,2)
 * //bind  第一个参数是你要绑定的this值，固定到那儿，后续参数是要传给函数的值
 */
var value=2432;
var testObj=function(val){
        this.value=val;
        this.getValue=function(aaa){
            console.log("aaaaa="+aaa);
        return this.value;
    }

}
console.log(new testObj(234).getValue());
var getVal=new testObj().getValue;
console.log(getVal());
//运用bind，改变this指向
var getValue=getVal.bind(new testObj(111));
console.log(getValue(3333));


if(!Function.prototype.bind){
    Function.prototype.bind=function (context) {
        var self=this;//需要绑定this的函数
        var outArguments=[].prototype.slice.call(arguments,1);
        var F=new function(){

        };
        var bund=function(){
            var innerArguments=[].prototype.slice.call(arguments,0);
            var finalArgs=outArguments.concat(innerArguments);
            return self.apply((this instanceof F ? this : context), finalArgs);
        }
        F.prototype = self.prototype;
        bund.prototype = new F();
        return bund;
    }
}


var add={
    curry:function(x){
        return function(y){
            return x+y;
        }
    }
}
var add1=add.curry(1);
console.log(add1(6));
/*Function.method('add1',function () {
    var slice=[].prototype.slice,
    args=slice.apply(arguments),
    that=this;
    return  function(){
        return that.apply(null,args.concat(slice.apply(arguments)))
    }
})*/
function f (y,z){
    return  this.x+y+z;
}
var g=f.bind({x:1},2)
console.log(g(3));
