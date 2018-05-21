/**
 * Created by wanglijun on 2016/11/2.
 */
var qyModule=angular.module("qyModule",[]);
qyModule.constant('student',{
    "state":"study",
    "relation":["student","child"]
});
qyModule.value("xiaoming",{
    "name":"xiaoming",
    "age":"12",
    "sex":"nan"
})