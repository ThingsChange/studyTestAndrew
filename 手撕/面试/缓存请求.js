/**
 *
 * @author  晴云
 * @create 2020-11-02 21:49
 * @note 干什么的呢？
 **/
let stack=new Set();
let res=new Map();

function cacheRequest(url,callback,failCallback){
  let cbs=res.get(url)||[]
  cbs.push(callback)
  if(stack.has(url)){
    for(let cb of cbs){
      cb();
    }
    return callback(res.get(url))
  }else{
    request(url, callback, failCallback)
  }

}
const cache = {}
let stack=new Set();
const cbs=new Map();
function cacheRequest(url, successCallback, failCallback) {
  if(cache[url]) {
    return successCallback(cache[url])
  }
  if(stack.has(url)){
    cbs.set(url,(cbs.get(url)||[]).concat(successCallback))
  }
  stack.add(url);
  const callBack = function(res) {
    cache[url] = res
    for(let cb of cbs.values()){
      cb(res);
    }
    cbs.set(url,[])
  }

  request(url, callBack, failCallback)
}
