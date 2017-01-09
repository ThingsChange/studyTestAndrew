/**
 * Created by wanglijun on 2016/12/22.
 */
window.onload=function(){
    var obtn=document.getElementById("btn");
    var timer=null;
    var isTop=true;
    //可视区域高度
    var clientHeight=document.documentElement.clientHeight||document.body.clientHeight;
    var scrollHeight;
    obtn.onclick=function(){
         osTop=document.body.scrollTop||document.documentElement.scrollTop;
        console.log(osTop);
        timer=setInterval(function(){
        var ispeed = Math.floor(-osTop / 6);
        document.documentElement.scrollTop = document.body.scrollTop = osTop +ispeed;
        isTop = true;
        console.log(osTop+ispeed);
        if (osTop == 0){
            clearInterval(timer);
        }
        },30)
    }

    window.onscroll=function () {
        osTop=document.body.scrollTop||document.documentElement.scrollTop;
        if(osTop>=clientHeight){
            obtn.style.display='block';
        }else{
            obtn.style.display='none';
        }
        if(!isTop){
            clearInterval(timer);
        }
        isTop = false;
    }
}