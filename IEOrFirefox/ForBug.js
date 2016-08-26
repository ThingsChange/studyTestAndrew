/**
 * Created by wanglijun on 2016/8/17.
 */
//解决IE8之类不支持getElementsByClassName  但是这个是不支持IE5的，
// 因为IE5中不支持getElementsByTagName("*"),要使用分支document.all以防错误
;(function(){
    var win=window;
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (className, element) {
            var children = (element || document).getElementsByTagName('*');
            var elements = new Array();
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                var classNames = child.className.split(' ');
                for (var j = 0; j < classNames.length; j++) {
                    if (classNames[j] == className) {
                        elements.push(child);
                        break;
                    }
                }
            }
            return elements;
        };
    };
    win.getEvent=function () {
        return function () {
            var returnEvent;
            if (window.event) {
                returnEvent = window.event;
                returnEvent.target = event.srcElement;
                return returnEvent;
            }else{
                event = arguments.callee.caller.arguments[0];
            }
            func = arguments.callee.caller;
            while (func != null) {
                var arg0 = func.arguments[0];
                if (arg0) {
                    if ((arg0.constructor == Event || arg0.constructor == KeyboardEvent || arg0.constructor == MouseEvent )
                        || (typeof(arg0) == "object" && arg0.preventDefault
                        && arg0.stopPropagation)) {
                        arg0.target = arg0.target;
                        return arg0;
                    }
                }
                func = func.caller;
            }
            return null;
        }
    }();
})(window);
