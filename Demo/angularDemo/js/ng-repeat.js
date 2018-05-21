/**
 * Created by wanglijun on 2016/12/14.
 */
var myApp=angular.module("myApp",[]);
myApp.controller("SomeCtrl",function ($scope) {

}).controller("SecondCtrl",function ($scope) {

});
myApp.directive('myDirective', function () {
    return {
        restrict: 'A',
        scope: true
    }
});

myApp.controller("nameController",function($scope){

    $scope.title="标题";

    $scope.contents =[{text:1234},{text:5678}];
});
myApp.directive("direct",function(){
        return{
            restrict: 'ECMA',
            template: '<div>{{ title }}</div>'+'<div><ul><li ng-repeat="x in contents">{{ x.text }}</li></ul></div>',
            scope:{
                getTitle:'&',
                getContent:'&'
            },
           controller:function($scope){
                $scope.title=$scope.getTitle();     //调用无参函数
                $scope.contents=$scope.getContent();    //调用无参函数
            }
        }
    })



