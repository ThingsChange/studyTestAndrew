/**
 * Created by Andrew on 2016/12/18.
 */
define(['jquery','bootstrap'],function ($) {
     function setColor(color){
         $('body').css('backgroundColor',color);
     }
    return{
        change:function (color) {
            // for (var i=0;i<5;i++){
                setTimeout(setColor.bind(null,color),2000);
            // }

        },
        show:function () {
            console.log("hello");
        },
        message:function () {
            alert("hi");
        }
    }

})