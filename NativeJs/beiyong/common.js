/**
 * Created by wanglijun on 2016/10/27.
 */
(function(window,document,undefined){
    if(!String.prototype.trim){
        String.prototype.trim=function(){
            return this.replace(/^\s+|\s+$/g,"");
        }
    }
})(window,document);