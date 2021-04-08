/**
 *
 * @author  晴云
 * @create 2021-04-01 17:16
 * @note 干什么的呢？
 **/
canAddFood=1;
let a = function (type, primary) {
  let classNames = [];
  if (!type) {
    if (primary) {
      classNames = ['confirm-pay-button _cb _mbg'];
    } else {
      classNames = ['add-food-button'];
    }
    classNames.push(canAddFood ? '_mb' : '_bg3 _bc2')
  } else {
    if (primary) {
      classNames = ['confirm-pay-button _cb _mbg _mb']
    } else {
      classNames = ['add-food-button _mb'];
    }
  }
  return classNames.join('');
}
let b = function (type, primary) {
  let classNames = [];
  if (primary) {
    classNames = ['confirm-pay-button _cb _mbg']
  } else {
    classNames = ['add-food-button'];
  }
  if(type) classNames.push('_mb')
  else classNames.push(this.canAddFood ? '_mb' : '_bg3 _bc2')
  return classNames.join('')
}
console.log('这里是 a(0,0)===b(0,0) 的结果-------------', a(0,0)=== b(0,0))
console.log('这里是 a(1,0)===b(1,0) 的结果-------------', a(1,0),b(1,0))
console.log('这里是 a(0,1)===b(0,1) 的结果-------------', a(0,1)===b(0,1))
console.log('这里是 a(1,1)===b(1,1) 的结果-------------',a(1,1),b(1,1) )

