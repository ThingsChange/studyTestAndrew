/**
 * Created by wanglijun on 2016/8/22.
 */
/*;(function (){
    if(!Object.assignObj){
        Object.assignObj=function(target,firstSource){
            "use strict";
            if(target===undefined||target===null){
                throw new TypeError("Cannot convert forst argument to object");
            }
            var to=Object(target);
            for (var i=1;i<arguments.length;i++){
                var nextSource=arguments[i];
                if(nextSource===undefined||nextSource===null) continue;
                var keysArray=Object.keys(Object(nextSource));
                for (var nextIndex=0,len=keysArray.length;nextIndex<len;nextIndex++){
                    var nextKey=keysArray[nextIndex];
                    var desc=Object.getOwnPropertyDescriptor(nextSource,nextKey);
                    var flag=to.hasOwnProperty(nextKey);
                    if(desc!==undefined&&desc!==null){
                        if(flag){
                            to[nextKey]+=nextSource[nextKey];
                        }else{
                            to[nextKey]=nextSource[nextKey];
                        }
                    }

                }
            }
            return to;
        }
    }
})();*/
;(function (){
    if(!Object.assignObj){
        console.log("assignObj=========="+Symbol.for("assignObj").toString());
        Object.prototype[Symbol.for("assignObj")]=function(target,firstSource){
            "use strict";
            if(target===undefined||target===null){
                throw new TypeError("Cannot convert forst argument to object");
            }
            var to=Object(target);
            for (var i=1;i<arguments.length;i++){
                var nextSource=arguments[i];
                if(nextSource===undefined||nextSource===null) continue;
                var keysArray=Object.keys(Object(nextSource));
                for (var nextIndex=0,len=keysArray.length;nextIndex<len;nextIndex++){
                    var nextKey=keysArray[nextIndex];
                    var desc=Object.getOwnPropertyDescriptor(nextSource,nextKey);
                    var flag=to.hasOwnProperty(nextKey);
                    if(desc!==undefined&&desc!==null){
                        if(flag){
                            to[nextKey]+=nextSource[nextKey];
                        }else{
                            to[nextKey]=nextSource[nextKey];
                        }
                    }

                }
            }
            return to;
        }
    }
})();
