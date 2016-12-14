/**
 * Created by wanglijun on 2016/8/25.
 */
//定义自己的模块
    //不依赖任何模块
var MyMoudle1=angular.module("Mya",[]);
MyMoudle1.controller("MyController",function($scope,providerService,factoryService,serviceService,providerService2){
    $scope.title="is a good test ?";
    $scope.today=new Date();
    $scope.testArray=[1,2,3,5,6,4,"qingyun","qingyun123","qingy",{"qy":"biming"},{"qy2":"biming2"}];
    $scope.typeFuc=function (str) {
        return "Object"==Object.prototype.toString.call(str).slice(8,-1);
    };
    if(factoryService.query()){
        $scope.title= factoryService.query();
    };
    if(serviceService.query()){
        $scope.title= serviceService.query();
    };
 /*   if(providerService.query()){
        $scope.title= providerService.query();
    };*/
  /*  var title= providerService2;
    $scope.title=providerService.secondUp(title);*/
})

MyMoudle1.filter("TitleFilter",function(){
    var testFilter=function(input1){
        var titleArr=input1.split(" ");
        var returnArr=[];
        var returnTitle="";
        for (var i=0,j=titleArr.length;i<j;i++){
            returnArr[i]=titleArr[i].charAt(0).toUpperCase()+titleArr[i].slice(1)+'\t';
        }
        return returnArr.join("");
    }
    return testFilter;
});
MyMoudle1.factory("factoryService",function(){
        var title={};
        title.query=function(){
            return "this is service made with factory";
        }
        return title;
});
MyMoudle1.service("serviceService",function () {
/*    this.query=function(){
        return "this is service made with service2";
}*/
//其实和上边的道理一样  只是上面的写法是构造函数的写法，而下面这样写相当于对这个类 进行重构（Java中的重载?）
    var title={};
    title.query=function(){
        return "this is service made with factory2";
    }
    return title;
});
//这是provider的构造函数的写法
MyMoudle1.provider("providerService",function(){
    //此处做展示用，注入了其他的服务，还可以注入$http,用来与服务器做交互，比如从服务器取得数据
    this.$get=['$timeout','$q',function($timeout,$q){
        var endUp=function(input){
            var titleArr=input.split(" ");
            for (var i=0,j=titleArr.length;i<j;i++){
                titleArr[i]=titleArr[i].slice(0,-1)+titleArr[i].charAt(titleArr[i].length-1).toUpperCase();
            }
            return titleArr.join(" ");
        }
        var secondUp=function(input){
            var titleArr=input.split(" ");
            for (var i=0,j=titleArr.length;i<j;i++){
                titleArr[i]=titleArr[i].slice(0,1)+titleArr[i].charAt(1).toUpperCase()+titleArr[i].slice(2);
            }
            return titleArr.join(" ");
        }
        return {
            endUp:endUp,
            secondUp:secondUp
        };
    }]
});
//这是provider的对象写法
MyMoudle1.provider("providerService2",{
    title:" I am providerService with Object",
    $get:function(){
        return this.title;
    },

});

MyMoudle1.directive("titleTest",["providerService2","providerService",function(providerService2,providerService){
    return {
        restrict   : 'A',
        scope      : {
            order           : '=',
            expandertitle: '=expanderTitle'
        },
        templateUrl: '../staticHtml/title-test.html',
        link       : function (scope, ele, attrs) {
            var title=providerService2;
            title=providerService.secondUp(title);
            scope.title=title;
        }
    };
}])