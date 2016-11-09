/**
 * Created by wanglijun on 2016/11/8.
 */
var myApp = angular.module("myApp", ['qc']);
myApp.controller('myCtrl', ['$scope', 'qcMessage', function ($scope, qcMessage) {
    $scope.staff = {
        first: " the first is blue",
        second: 'the second is red,',
        secondEnd: 'the SecondEnd  is green',
        third: 'the third is yellow'
    }
    $scope.isRed = true;
    $scope.isGreen = true;
    $scope.tip = function () {
        console.log("你妹");
        var messageOptions = {
            infoShowTime: 2,//默认5s
            tipShowTime: 1//默认5s
        };
        qcMessage.setOptions(messageOptions).tip("你说你这提示的是什么鬼？");
    }
}])