/**
 *
 * @author  晴云
 * @create 2020-10-23 11:40
 * @note 干什么的呢？
 **/
function requestData(urls, max, callBack) {
  let reqQueue = [];
  let result = [];
  let count = 0;
  let urlLen = urls.length;
  const handleRequest = url => {
    const req = fetch(url).then((r) => {
      let len = result.push(r)
      if (len < urlLen && count + 1 < urlLen) {
        reqQueue.shift();
        handleRequest(urls[++count])
      } else if (len === urlLen) {
        typeof callBack === 'function' && callBack(result)
      }
    }).catch(e => result.push(e))
    if (reqQueue.push(req) < max) {
      handleRequest(urls[++count])
    }
  }
  handleRequest(urls[count])
}
