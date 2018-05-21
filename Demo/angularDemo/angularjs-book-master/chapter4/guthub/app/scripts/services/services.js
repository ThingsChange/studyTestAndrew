'use strict';
/**ngResource模块是angular专门为RESTful架构而设计的一个模块,它提供了'$resource'模块,$resource模块是基于$http的一个封装.下面来看看它的详细用法
1.引入angular-resource.min.js文件
2.在模块中依赖ngResourece,在服务中注入$resource
 http://www.cnblogs.com/liulangmao/p/3906721.html
 */
var services = angular.module('guthub.services',
    ['ngResource']);

services.factory('Recipe', ['$resource',
    function($resource) {
  return $resource('/recipes/:id', {id: '@id'});
}]);
/**
 * ES6中Promise、angularJS内置的AngularJS内置Q，以及when采用的都是Promises/A规范，如下：

 每个任务都有三种状态：未完成(pending)、完成(fulfilled)、失败(rejected)。

 pending状态：可以过渡到履行或拒绝状态。
 fulfilled状态：不能变为其他任何状态，而且状态不能改变，必须有value值。
 rejected状态：不能变为其他任何状态，而且状态不能改变，必须有reason。
 http://www.cnblogs.com/mliudong/p/4151594.html
 */
services.factory('MultiRecipeLoader', ['Recipe', '$q',
    function(Recipe, $q) {
  return function() {
    var delay = $q.defer();
    Recipe.query(function(recipes) {
      delay.resolve(recipes);
    }, function() {
      delay.reject('Unable to fetch recipes');
    });
    return delay.promise;
  };
}]);

services.factory('RecipeLoader', ['Recipe', '$route', '$q',
    function(Recipe, $route, $q) {
  return function() {
    var delay = $q.defer();
    Recipe.get({id: $route.current.params.recipeId}, function(recipe) {
      delay.resolve(recipe);
    }, function() {
      delay.reject('Unable to fetch recipe '  + $route.current.params.recipeId);
    });
    return delay.promise;
  };
}]);
