/**
 * Created by wanglijun on 2016/11/8.
 */
var myApp = angular.module("myApp", ['qc']);
myApp.config(function(qcMessageProvider){//此处的qcMessageProvider可以用debug跟一下，有三个值，$get,messageOptions,函数setMessageOptions
    var messageOptions = {
        infoShowTime: 2,//默认5s
        tipShowTime: 1//默认5s
    };
    qcMessageProvider.setMessageOptions(messageOptions);
});
myApp.controller('myCtrl', ['$scope', 'qcMessage', function ($scope, qcMessage) {
    $scope.staff = {
        first: " the first is blue",
        second: 'the second is red,',
        secondEnd: 'the SecondEnd  is green',
        third: 'the third is yellow'
    }
    $scope.isRed = false;
    $scope.isGreen = false;
    $scope.tip = function () {
        console.log("你妹");
        $scope.isRed=!$scope.isRed;
        $scope.isGreen=!$scope.isGreen;
        qcMessage.warning("你说你这提示的是什么鬼!");
        /*var messageOptions = {
            infoShowTime: 2,//默认5s
            tipShowTime: 1//默认5s
        };
        qcMessage.setOptions(messageOptions).tip("你说你这提示的是什么鬼？");*/
    }
}])
