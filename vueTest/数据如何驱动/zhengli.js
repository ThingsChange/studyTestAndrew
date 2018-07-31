/**
 *  created by qingyun
 *  time: 2018/7/17  20:48
 *  note : 实现数据的双向绑定
 */
//应该有监听器，观察者，桥梁
//监听器，监听传入的对象的每个属性，如果有变化，则通知观察者，干该干的事儿
function typeString(param) {
  return Object.prototype.toString.call(param).slice(8, -1)
}

/*
*
* asd*/
function Dep() {
  this.subs = [];
  this.addSub = function (watcher) {
    this.subs.push(watcher);
  }
  this.notify = function () {
    this.subs.forEach(v => {
      v.update();
    })
  }
}

function Watcher(fuc) {
  this.update = function () {
    Dep.target = this;
    fuc();
    Dep.target = null;
  }
  this.update();
}

function Observer(obj, key, value) {
  let dep = new Dep;
  if (typeString(value) === 'Object') {
    Object.keys(value).forEach((value, key, Array) => {
      new Observer(value, key, value(key))
    })
  }
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return value;
    },
    set: function (newVal) {
      value = newVal;
      dep.notify();
    }
  })
}
