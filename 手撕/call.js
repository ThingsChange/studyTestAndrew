/**
 *
 * @author  晴云
 * @create 2020-09-16 16:16
 * @note 干什么的呢？
 **/

Function.prototype._call = function (thisTarget, ...args) {
  thisTarget = thisTarget == null ? window : thisTarget;
  if (['number', 'string', 'boolean'].includes(typeof thisTarget)) {
    thisTarget = Object(thisTarget)
  }
  let result;
  let temp = Symbol.for('1')
  thisTarget[temp] = this;
  result = thisTarget[temp](...args);
  delete thisTarget[temp]
  return result;
}

var a = 1;
var obj = {a: 1}

function f(x, y,z) {
  console.log('这里是 this.a 的结果-------------', this.a, x, y,z)
}

// f.call(obj, 2, 3)

Function.prototype._apply = function (thisTarget, args) {
  thisTarget = thisTarget == null ? window : thisTarget;
  if (['number', 'string', 'boolean'].includes(typeof thisTarget)) {
    thisTarget = Object(thisTarget)
  }
  let result;
  let temp = Symbol.for('1')
  console.log('这里是 this 的结果-------------', this)
  thisTarget[temp] = this;
  result = thisTarget[temp](...args);
  delete thisTarget[temp]
  return result;
}
f._apply(obj,[2,3],4)
