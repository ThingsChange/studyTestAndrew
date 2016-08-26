/**
 * Created by wanglijun on 2016/7/11.
 */
var app=angular.module("mainApp",[])
        .controller("SubCtrl",function($scope,init,operation,newAdd,newSub){
            $scope.init=init;
            $scope.firstName=$scope.init[0];
            $scope.lastName=$scope.init[1];
            var a=$scope.firstName;
            var b=$scope.lastName;
            $scope.total=function(a,b){
                return $scope.firstName+$scope.lastName;
            }
            $scope.$watch($scope.total,callBackFunction)
            function callBackFunction(newValue,oldValue,scope){
                a=$scope.firstName;
                b=$scope.lastName;
                $scope.resAdd=operation.addition(a,b);
                $scope.resSub=operation.subtraction(a,b);
                $scope.resMul=operation.multiply(a,b);
                $scope.resDiv=operation.division(a,b);
                $scope.resMod=operation.Modular(a,b);
                $scope.resAdd2=newAdd.query(a,b);
                $scope.resSub2=newSub.query(a,b);
            }
        });
/**
 * 这个方法的参数呢，可以是一个构造函数，也可以是一个对象（紧跟着下面的就是一个对象）
 */
app.provider("operation",function(){
    //此处其实没有必要注入，只是说明这种写法而已
    this.$get=['$timeout','$q',function($timeout,$q){
        var addition=function(a,b){
            return Number(a)+Number(b);
        };
        var subtraction=function(a,b){
            return a-b;
        };
        var multiply=function(a,b){
            return a*b;
        };
        var division =function(a,b){
            return a/b;
        };
        var Modular=function(a,b){
            return a%b;
        };
        return {
            addition:addition,
            subtraction:subtraction,
            multiply:multiply,
            division:division,
            Modular:Modular
        }
    }]
});
app.provider('init', {
    ab:10,
    b:3,
    $get: function () {
        return [10,3];
    }
});
/**
 *  那如果每次都要写一个 $get 是不是很麻烦？ OK，所以我们有了 factory。
 *  factory 可以说是 provider 的变种， 方法中的第二个参数就是 $get 中的内容。
 */
app.factory("newAdd",function(){
    var items={};
    items.query=function(a,b){
        return  Number(a)+Number(2*b);
    }
    return items;
})

/**
 * 在 factory 的例子中我们还是需要 new 一个对象返回，
 * 而 service 就更简单了，这一步都帮你省了， 他的第二个参数就是你要返回的对象类，
 * 也就是 new 的哦给你工作都不用你做了。够清爽吧？
 */
app.service("newSub",function(){
    this.query=function(a,b){
        return Number(a)-Number(2*b);
    }
});