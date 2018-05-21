/**
 * Created by Andrew on 2016/12/18.
 */
require.config({
    //定义基准路径
    baseUrl:'../app/',
    //定义模块路径的
    paths:{
        'jquery':'../js/jquery-3.1.0.min',
        'angular':'../js/angular.min',
        'underscore':'../../underscore-analysis/underscore-1.8.3-analysis', //自己不符合 自己搞去
        'bootstrap':'../js/bootstrap.min', //自己不符合 自己搞去
        'css':'../js/css.min',
        'notAmd':'notAmd'
    },
    //定义依赖关系
    shim:{
        'bootstrap':{
            deps:['jquery','css!../css/bootstrap.min.css','css!../css/font-awesome.min.css']
        },
        'notAmd':{
            //该写法适用于只有一个方法的js
            //  exports:'notAmd',
            //该写法适用于有n个方法的js  如果两种写法同时存在，init的优先级较高，以init为准
            init:function () {
                return{
                    old:old1,//此处old1是不需要加引号的，因为引用的是全局变量
                    old2:old2,
                }
            }
        }

    }
})