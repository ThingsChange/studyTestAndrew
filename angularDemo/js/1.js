/**
 * Created by wanglijun on 2016/12/21.
 */
var myApp=angular.module("myApp",[]);
myApp.controller("myCtrl",function($scope){
    $scope.user={
        name:"zhangsan"
    }
    $scope.reset=function(){
        $scope.user={
            name:"zhangsan"
        }
    }
})