/**
 * Created by wanglijun on 2016/11/1.
 * 测试scope的继承机制
 */
var myApp=angular.module("myApp",[]);
myApp.controller("MainController",["$scope",function($scope){
    $scope.name="王子"
}])
myApp.directive("myDirective",function(){
    return {
        restirct:'E',
        scope:false,//当为false时候，儿子继承父亲的值;改变父亲的值，儿子的值也随之变化，反之亦如此。（继承不隔离）
        template:'<div>儿子：{{name}}<input ng-model="name"/></div>'
    }
})
myApp.directive("myDirective2",function(){
    return{
        restirct:'E',
        scope:true,//当为true时候，儿子继承父亲的值;改变父亲的值，儿子的值随之变化，但是改变儿子的值，父亲的值不变。（继承隔离）
        template:'<div>儿子：{{name}}<input ng-model="name"/></div>'
    }
})
myApp.directive("myDirective3",function(){
    return{
        restirct:'E',
        scope:{},//没有继承父亲的值，所以儿子的值为空，改变任何一方的值均不能影响另一方的值。（不继承隔离）
        template:'<div>儿子：{{name}}<input ng-model="name"/></div>'
    }
})