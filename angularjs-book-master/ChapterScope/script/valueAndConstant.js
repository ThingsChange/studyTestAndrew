/**
 * Created by wanglijun on 2016/11/2.
 */
var myApp=angular.module("myApp",[]);
myApp.constant('student',{
    "state":"study",
    "relation":["student","child"]
});
myApp.value("xiaoming",{
    "name":"xiaoming",
    "age":"12",
    "sex":"nan"
})

myApp.controller("myController",["$scope",'student','xiaoming','uGuess',function($scope,student,xiaoming,uGuess){
    $scope.showPeople=function(){
        $scope.people=student.relation;
        $scope.state=student.state;
        $scope.name=xiaoming.name;
        $scope.age=xiaoming.age;
        $scope.sex=xiaoming.sex;
    }
    $scope.changePeople=function(){
        xiaoming.name="小红"
        xiaoming.age="18";
        xiaoming.sex="nv";
        student.state='123'
        $scope.sex= xiaoming.sex;
        $scope.state=student.state;
        uGuess.nowSex();
        uGuess.nowState();
    }
}])

    myApp.directive("changeChild",function(){
        return {
            restrict:'AE',
            scope:{
                changepeo:'&'
            },
            template:'<button  ng-click="changepeo()">Greeting</button>'
        }
    })
myApp.provider("uGuess",function(){
    this.$get=['student','xiaoming',function(student,xiaoming){
        var nowSex=function(){
            console.log(xiaoming.sex);
        }
        var nowState=function(){
            console.log(student.state);
        }
        return{
            "nowSex":nowSex,
            "nowState":nowState
        }
    }]
})