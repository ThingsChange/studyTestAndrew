/**
 * Created by wanglijun on 2016/11/8.
 */
var myApp2 = angular.module("myApp2", ['qc']);
myApp2.config(function(qcMessageProvider){
    var messageOptions = {
        infoShowTime: 2,//默认5s
        tipShowTime: 4//默认5s
    };
    qcMessageProvider.setMessageOptions(messageOptions);
});
myApp2.controller('myCtrl2', ['$scope', 'qcMessage', function ($scope, qcMessage) {
    $scope.staff = {
        first: " the first is blue",
        second: 'the second is red,',
        secondEnd: 'the SecondEnd  is green',
        third: 'the third is yellow'
    }
    $scope.isRed = false;
    $scope.isGreen = false;
    $scope.tip = function () {
        console.log("你妹2");
        $scope.isRed=!$scope.isRed;
        $scope.isGreen=!$scope.isGreen;
        qcMessage.tip("你说你这提示的是什么鬼2!");
        /*var messageOptions = {
            infoShowTime: 2,//默认5s
            tipShowTime: 1//默认5s
        };
        qcMessage.setOptions(messageOptions).tip("你说你这提示的是什么鬼？");*/
    }
}])
