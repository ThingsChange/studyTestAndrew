/**
 * Created by wanglijun on 2016/8/25.
 */
    var myModule=angular.module("myApp",[]);
    myModule.controller("repeatController",function($scope){
        $scope.itemList=["1","2","3","4","5"];
    });