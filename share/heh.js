/**
 *
 * @author  晴云
 * @create 2021-05-26 10:39
 * @note 干什么的呢？
 **/

let a = new Promise((resolve, reject) => {
  Promise.resolve(3).then(a => {
    switch (a) {
      case 1:
        resolve(1);
        break;
      case 2:
        resolve(2);
        break;
      case 3:
        window.location.href = "https://dohko.m.hualala.com/or/extension/getPageShareDecorateInfo?groupID=11157&mpID=EZ3PE938KU639dcf"
        break;
      default:
        reject({
          code: '000',
          msg: '',
          response: json
        });
    }
  }).catch(() => {
    console.log('这里是 0 的结果-------------', 0)
    reject(0)
  })
}).then(res=> console.log('这里是 res 的结果-------------', res)).catch((err)=> console.log('这里是 2345 的结果-------------', 2345))
let b = new Promise((resolve, reject) => {
  Promise.resolve(3).then(a => {
    switch (a) {
      case 1:
        resolve(1);
        break;
      case 2:
        resolve(2);
        break;
      case 3:
        window.location.href = "https://dohko.m.hualala.com/or/extension/getPageShareDecorateInfo?groupID=11157&mpID=EZ3PE938KU639dcf"
        break;
      default:
        reject({
          code: '000',
          msg: '',
          response: json
        });
    }
  }).catch(() => {
    console.log('这里是 0 的结果-------------', 0)
    reject(0)
  })
}).then(res=> console.log('这里是 res 的结果-------------', res)).catch((err)=> console.log('这里是 2345 的结果-------------', 2345))

var c= Promise.all([a,b]).catch(v=> console.log('这里是 v 的结果-------------', v))
