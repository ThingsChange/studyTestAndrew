/**
 * Created by wanglijun on 2016/12/14.
 */
angular.module('myApp', [])
    .controller('SomeController', function ($scope) {
        // 反模式，裸值
        $scope.someBareValue = 'hello computer';
// 设置 $scope 本身的操作，这样没问题
        $scope.someAction = function () {
// 在SomeController和ChildController中设置{{ someBareValue }}
            $scope.someBareValue = 'hello human, from parent';
        };
    })
    .controller('ChildController', function ($scope) {
        $scope.childAction = function () {
// 在ChildController中设置{{ someBareValue }}
            $scope.someBareValue = 'hello human, from child';
        };
    });