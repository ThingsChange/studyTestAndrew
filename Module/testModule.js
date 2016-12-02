/**
 * Created by wanglijun on 2016/12/1.
 */
;var Module=((function () {
    var my={},
    privateVariable=1;
    function privateMethod() {
        console.log(privateVariable);
    }
    my.moduleProperty=1;
    my.moduleMethod=function (a,b) {
        console.log(a+b);
    }
    return my;
})());
var Module=(function(my){
    var old_ModuleMethod=my.moduleMethod;
    console.log(old_ModuleMethod);
    my.moduleMethod=function(a,b){
        console.log("老方法的答案是a*b==="+old_ModuleMethod(a,b));
        console.log("新方法的答案是a*b==="+a*b);
    }
    window.old_ModuleMethod=old_ModuleMethod;
    return my;
})(Module);
Module.moduleMethod(10,20);
