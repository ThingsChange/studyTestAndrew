/**
 * Created by zhaoli liu on 2017/1/4.
 */

//闭包首先是一个函数，闭包可以调用其他函数内部变量的一个函数
/*
function a(num1,num2,num3){
    console.log(num1+num2);
    console.log(num1);
    console.log(num2);
}

var b = a.bind(null,1,3);
b(2);//3

*/




/*var num=2;
function test() {
    this.num=1;
    function _add() {
        console.log(this.num++);
    }
    return _add();
}

var x=test();//1




var num=2;
function test() {
    var num=1;
    function _add() {
        console.log(this.num++);
    }
    return _add();
}

var x=test();//2


var num=2;
function test() {
    var num=1;
    function _add() {
        console.log(num++);
    }
    return _add;
}

var x=test();
x();//1*/


var num=2;
function test() {
    this.num=1;
    function _add() {
        console.log(num++);
    }
    return _add();
}

var x=test();//1



var num=2;
function test() {
    this.num=1;
    function _add() {
        return function (){
            console.log(num++)
        };
    }
    return _add();
}

var x=test();//1