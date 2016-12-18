/**
 * Created by Andrew on 2016/12/18.
 */
define(['jquery','bootstrap'],function ($) {
    return {
        change:function (color) {
            setTimeout(function () {
                $('body').css('backgroundColor',color);
            },2000)
        },
        show:function () {
            console.log("hello");
        },
        message:function () {
            alert("hi");
        }
    }
})