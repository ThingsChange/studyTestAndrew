/**
 * Created by wanglijun on 2016/12/14.
 */
/*
data:{
    a:{
        b:{
            c:{

        }
        d:{

        }
        }
    }
}

if(data&&data.a&&data.a.b&&data.a.b.c){
    var d=data.a.b.c;
    (d.name)?d.name:"";
}
*/
function Foo() {
    getName = function () {//代码1
        alert(1);
    };
    return this;
}
Foo.getName = function () {
    alert(2);
};
Foo.prototype.getName = function () {
    alert(3);
};


var getName = function () {
    alert(4);
};
function getName() {
    alert(5);
}

//请写出以下输出结果：
Foo.getName();//2//对象属性，因为函数也是对象
getName();//4//函数表达式声明提前，赋值在表达式赋值的原地 未提前，而函数声明方法 创建函数，则是整体提前
Foo().getName();//1//Foo以函数方式执行，表达式//代码1 运行，对getName重新赋值，而该getName在全局有声明，故为 重新赋值，而不是声明了以   无 var 方式隐士声明  一个全局变量
getName();//1
new Foo.getName();//2   如果构造函数不需要传递参数，那么声明实例（new Foo ）的时候可以省略构造函数后面的（）；
                       // 注释XXXXXX：//上面调用顺序是  相当于 var B=Foo.getName;   获得一个函数 new B() 然后函数执行被调用,2弹出
new Foo.getName;//2   如果构造函数不需要传递参数，那么声明实例（new Foo ）的时候可以省略构造函数后面的（）；
new Foo().getName();//1  3
new new Foo().getName();//  3 //同 注释XXXXXX new Foo()实例，new Foo().getName实例的属性，在原型上，是个函数 new 函数()；
