/**
 * Created by wanglijun on 2016/11/1.
 * 测试scope的继承机制
 */
var myApp=angular.module("myApp",[]);
myApp.controller("myController",["$scope",function($scope){
        $scope.name="哈哈";
}]
)
myApp.directive("isolatedDirective",function(){
    return{
        restirct:"A",
        scope:{
            name:'@',
        },
        template: 'Say：{{name}} <br>改变隔离scope的name：<input type="buttom" value="" ng-model="name" class="ng-pristine ng-valid">'

    }
})
myApp.controller("myController2",["$scope",function($scope){
        $scope.userBase={
            name:"张三",
            id:"1"
        };
    }]
)
myApp.directive("isolatedDirective2",function () {
    return{
        restirct:"A",
        scope:{
            user:'='
        },
        template:'Say：{{user.name}} <br>改变隔离scope的name：<input type="buttom" value="" ng-model="user.name"/>'

    }
})
myApp.controller("myController3",["$scope",function($scope){
       $scope.value="hello world";
       $scope.max=50;
       $scope.min=25;
        $scope.click=function(min,max){
             min=parseInt(min);
             max=parseInt(max);


            $scope.value=parseInt(Math.random()*(max-min+1)+min);
        }
    }]
)
myApp.directive("isolatedDirective3",function () {
    return{
        restirct:"A",
        scope:{
            action:'&',
            max:'@',
            min:'@'
        },
        template:'<input type="text" ng-model="min" /><br/>' +
                 '<input type="text" ng-model="max" /><br/>' +
        '<input type="button" value="在directive中执行父scope定义的方法" ng-click="action({min:min,max:max})"/>'

    }
})