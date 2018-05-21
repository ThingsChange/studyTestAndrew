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
myApp.constant('fixedValue', {
    theFourth:{
        color:'black'
    }
});
myApp.controller('myCtrl', ['$scope', 'qcMessage', 'fixedValue',function ($scope, qcMessage,fixedValue) {
    $scope.staff = {
        first: " the first is blue",
        second: 'the second is red,',
        secondEnd: 'the SecondEnd  is green',
        third: 'the third is yellow',
        fourth:'the firth is yellow'
    }
    $scope.isRed = false;
    $scope.isGreen = false;
    $scope.isYellow = true;
    $scope.tip = function () {
        console.log("你妹");
        $scope.isRed=!$scope.isRed;
        $scope.isGreen=!$scope.isGreen;
        fixedValue.theFourth.color='black';
        qcMessage.tip("你说你这提示的是什么鬼!");

        /*var messageOptions = {
            infoShowTime: 2,//默认5s
            tipShowTime: 1//默认5s
        };
        qcMessage.setOptions(messageOptions).tip("你说你这提示的是什么鬼？");*/
    }
}])
myApp.controller('myCtrl2', ['$scope', 'qcMessage','fixedValue', function ($scope, qcMessage,fixedValue) {
    $scope.staff = {
        /*first: " the first is blue",
        second: 'the second is red,',
        secondEnd: 'the SecondEnd  is green',
        third: 'the third is yellow'*/
        fourth:'the firth is yellow'
    }
    $scope.isRed = false;
    $scope.isBlack = false;
    $scope.isGreen = false;
    $scope.staff.fourth = fixedValue.theFourth.color;
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

