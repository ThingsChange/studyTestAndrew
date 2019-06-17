/**
 *
 * @author  晴云
 * @create 2019-05-24 16:24
 * @note 干什么的呢？
 **/
var a = {n:1};
var b = a;
a.x = a = {n:2};

b  ={n:1,x:a}
a={n:2}
b={n:1,x:{n:2}}


console.log(a.x);// --> undefined
console.log(b.x);// --> [object Object]
