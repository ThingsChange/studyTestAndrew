/**
 *
 * @author  晴云
 * @create 2020-11-06 11:04
 * @note 干什么的呢？
 **/

const cache = new Map();
function cacheRequest(url, successCallback) {
  if(!cache.has(url)) {
    cache.set(url,new Promise(resolve=>{
      request(url,resolve);
    }))
  }

return   cache.get(url).then(successCallback)
}
