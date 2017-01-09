/**
 * Created by Andrew on 2016/12/24.
 * 表格校验
 */

var checkName=function () {
    console.log("这里检测当前输入的名字是否合格");
}
var checkPassword=function () {
    console.log("这里检测当前输入的密码是否合格");
}
var checkIdentifyCode=function () {
    console.log("这里检测当前输入的验证码是否合格");
}
//PS:其实这种写法是面向过程的编程思维，每当需要解决一个问题的时候，编写一个函数。
//这样无端添加了许多全局变量，并且不利于后续开发者的重复利用。如果别人使用了这些东西，
//就不能轻易更改这些方法了。不利于代码维护，所以要尝试 面试对象编程。
// 将需求抽象成一个对象，然后针对这个对象分析其特征（属性）与动作（方法）。
//但是这样写每次都会返回新对象，用的各自的方法
var checkObject = function () {
    return {
        checkName: function () {
            console.log("这里检测当前输入的名字是否合格");
        },
        checkPassword: function () {
            console.log("这里检测当前输入的密码是否合格");
        },
        checkIdentifyCode: function () {
            console.log("这里检测当前输入的验证码是否合格");
        }
    }
}
var loginCheck=checkObject();
//尝试用类的方法去写
//PS；声明类的规范，如果该函数当做构造函数来用，类名首字符就需要大写啦
var CheckObject = function () {
    this.checkName = function () {
        console.log("这里检测当前输入的名字是否合格");
        return this;
    }
    this.checkPassword = function () {
        console.log("这里检测当前输入的密码是否合格");
        return this;
    }

    this.checkIdentifyCode = function () {
        console.log("这里检测当前输入的验证码是否合格");
        return this;
    }
}

var loginCheck=new CheckObject();
loginCheck.checkName();
//但是这样每次检测你都得去创建一个对象，对象用的方法确实各自的，相对来说有点奢侈
//可以考虑把方法放到原型上，原型上一般放公用的方法，而具体多态  就是说各自的方法以及属性在自己实现类中实现

var  checkObject=function () {};
checkObject.prototype={
    checkName: function () {
        console.log("这里检测当前输入的名字是否合格");
        return this;
    },
    checkPassword: function () {
        console.log("这里检测当前输入的密码是否合格");
        return this;
    },
    checkIdentifyCode: function () {
        console.log("这里检测当前输入的验证码是否合格");
        return this;
    }
}
var loginCheck = checkObject();
loginCheck.checkName().checkPassword().checkIdentifyCode();

//为每一个函数添加检查名字及密码的方法
Function.prototype.addMethod=function (name,fn) {
    this[name]=fn;
    return this;
}
var method=function(){};
method.addMethod("checkName",function () {
    console.log("这里检测当前输入的名字是否合格");
    return this;
}).addMethod("checkPassword",function () {
    console.log("这里检测当前输入的密码是否合格");
    return this;
});
method.checkName().checkPassword();
//为什么不直接在prototype上添加checkName呢
Function.prototype.addMethod=function (name,fn) {
    this.prototype[name]=fn;
    return this;
}
var Methods=function(){}//此时声明的是个构造函数，其实就是声明了一个类。
var method=new Methods();
method.addMethod("checkName",function () {
    console.log("这里检测当前输入的名字是否合格");
    return this;
});
