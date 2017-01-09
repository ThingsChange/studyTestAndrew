/**
 * Created by wanglijun on 2016/12/16.
 */
/**
 *由于整个应用都会和路由打交道，所以在这里把与路由相关的$state和$stateParams这两个对象放在$rootScope上，方便其他地方引入使用
 * @type {module}
 */
var qyStudyApp=angular.module("qyStudyApp",['ui.router','ngAnimate']);
//运行快，只会运行一次
qyStudyApp.run(function ($rootScope,$state,$stateParams) {
    $rootScope.$state=$state;
    $rootScope.$stateParams=$stateParams;
})
//配置块，项目启动的时候会运行
qyStudyApp.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('form',{
        url:'/form',
        templateUrl:'form.html',
        controller:'formController'
        })
        .state('form.profile',{
            url:'/profile',
            templateUrl:'form-profile.html'
        })
        .state('form.interests',{
            url:'/interests',
            templateUrl:'form-interests.html'
        })
        .state('form.payment',{
            url:'/payment',
            templateUrl:"form-payment.html"
        });
    $urlRouterProvider.otherwise('form/profile');
})
qyStudyApp.controller('formController',function ($scope) {
    $scope.formData={};
    $scope.processFrom=function() {
        alert('awesome!');
    };
})
