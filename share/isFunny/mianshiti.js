/**
 * Created by Andrew on 2017/1/14.
 * 好玩的面试题
 */
function Foo() {
    getName = function () {
        console.log('1');
    };
    return this;
}
Foo.getName = function () {
    console.log('2');
};
Foo.prototype.getName = function () {
    console.log('3');
};
var getName = function () {
    console.log('4');
};
function getName() {
    console.log(5);
}

Foo.getName(); //2
getName();  //4
Foo().getName();//1
getName();     //1
new Foo.getName();//2
new Foo().getName();//3
new new Foo().getName();//3
var x={ o : {
    fn:() => {
        console.log(this)
    }
}}
// x.o.fn();  window

f(n,1)= n;
f(n,2)=n
//第k层   那么
f(n,2)
//如果第一次碎了
f(n,2)=1+(k-1);
//否则
f(n,2)=1+f(n-k,2)
/*
* n层楼
* m个小球
* */
function getNum(n,m){
    if(m=1){
        return  n;
    }
    let k;
    let x;
    //当有两个小球的时候
    if(m==2){
        //假设第一次在第K层投掷
        //假设第一次碎了
        if(x){
            return  1+(k-1);
        }else{
            if(k>n){
                return false;
            }
            return 1+getNum(n-k,m);
        }

    }
}


