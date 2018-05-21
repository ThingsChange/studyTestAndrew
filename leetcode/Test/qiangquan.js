// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @author       You
// @match        https://sale.jd.com/act/guXmKoHwOfd2ZT.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.alert=function(context){console.log(context)};
    let count=1;
    let DD={
        getServerDate(){
            return new Date($.ajax({async: false}).getResponseHeader("Date"));
        },
        getCoupon(){
            let time=new Date('2018-05-17 10:00:00').getTime();
            if(getServerDate().getTime()-time>0){
                console.log('开始抢券');
                console.log($('.state-10').length);
                $('.state-10').trigger('click');
                console.log(`第${count}抢券`);
                count++;

            }
        },

        beginGetCoupon(){
            this.timer=setInterval(DD.getCoupon,100)
        },
        endCoupon(){
          if(this.timer){
              this.timer=null
              clearInterval(this.timer);
          }
        },
        timer:null
    }
    window.DD=DD;
})();

(function () {
    function registerPanel() {
        if (document.getElementById('_cmds_') == null) {
            var cmds = document.createElement('div')
            cmds.id = '_cmds_'
            cmds.style = 'color:#FFF;background-color:#000;border:2px solid black; z-index:999;position:fixed;height:650px;width:500px;top:50px;right:10px'
            cmds.innerHTML = `
                                <div style='margin:10px'>
                                    <input style='margin:5px' type='button' value='开始抢券' id='_getCoupon'>
<input style='margin:5px' type='button' value='结束抢券' id='_deleteCoupon'>
                               </div>
                                <div id='_message' style='height:550px;overflow-y:auto'>
                                </div>
                            `
            document.body.appendChild(cmds)

            document.querySelector('#_getCoupon').addEventListener('click', function () {
                DD.beginGetCoupon();
            })
            document.querySelector('#_deleteCoupon').addEventListener('click', function () {
                DD.endCoupon(DD.timer);
            })
        }
    }
    registerPanel();
})();