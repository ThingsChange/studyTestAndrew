var myModule=angular.module("MyModule",[]);
//创建service 从指定的路径获取数据
myModule.factory("bookService",["$http",function($http){
    var doRequest=function(url){
        return $http({
            method:"GET",
            url:url
        })
    }
    return {
        bookList:function(url){
           return doRequest(url);
        }
    }
}])
//定义controller
myModule.controller('bookController',["$scope",'$timeout','bookService',function($scope,$timeout,bookService){
    var timeout;
    $scope.$watch('resourseUrl',function(newResourseUrl){
        if(newResourseUrl){
            if(timeout){
            $timeout.cancel(timeout);
            }
            timeout=$timeout(function(){
                bookService.bookList(newResourseUrl).success(function (data,status,headers,config){
                    $scope.bookList=data;
                }).error(function(){
                    $scope.bookList="";
                })
            },350);
        }

    })

}])
//声明一个过滤器
myModule.filter('bNameLength',function(){
    var checkLength=function(bookName){
        if(bookName.length>10){
            return bookName.slice(0,10)+"...";
        }else{
            return bookName;
        }
    }
    return checkLength;
})
