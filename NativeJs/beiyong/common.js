/**
 * Created by wanglijun on 2016/10/27.
 */
(function(window,document,undefined){
   /* if(!String.prototype.trim){
        String.prototype.trim=function(){
            return this.replace(/^\s+|\s+$/g,"");
        }
    }
    if (!Array.prototype.indexOf){//IE8的数组是不支持indexof方法的
        Array.prototype.indexOf = function(elt /!*, from*!/)
        {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++)
            {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    };*/

if(true){
    function  A(){
        alert("first")
    }
}else{
    function A(){
        alert("two")
    }
}
A();



    // alert("1,2,3,4,5,6".split(",")[2])
})(window,document);