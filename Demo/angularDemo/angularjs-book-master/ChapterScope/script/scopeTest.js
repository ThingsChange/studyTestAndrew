/**
 * Created by wanglijun on 2016/7/8.
 */
var app=angular.module("mainApp",[]);
app.controller("SubCtrl",["$rootScope","$scope",function($rootScope,scope){
    //scope.abc="4";
    $rootScope.abc="245";

    scope.user={};
    scope.user.lastName="网路";
    scope.items=[{name:"wl"},{name:"w12"},{name:"wl3"},{name:"wl4"}];
}])

app.controller("MainCtrl",["$scope","$rootScope",function(scope,$rootScope){
    //scope.abc="123";
    //$rootScope.abc="234";
    //scope.items=[{name:"wl"},{name:"w12"},{name:"wl3"},{name:"wl4"}];
    $rootScope.obj={};
    $rootScope.obj.items={arr:[{name:"wl"},{name:"w12"},{name:"wl3"},{name:"wl4"}]};
    $rootScope.items=[{name:"wl"},{name:"w12"},{name:"wl3"},{name:"wl4"}];
}])
app.controller("SubCtrl2",["$scope","$rootScope",function(scope,$rootScope){
    //scope.abc="123";
    //$rootScope.abc="234";
    //scope.items=[{name:"wl"},{name:"w12"},{name:"wl3"},{name:"wl4"}];
    //$rootScope.items=[{name:"wl"},{name:"w12"},{name:"wl3"},{name:"wl4"}];
}])