/**
 *  created by qingyun
 *  time: 2018/7/16  20:41
 *  note : 描述作用
 */
//桥梁作用，关联Observer 和watcher 一个Observer 对应着一个Dep
// ,dep内维护一个数组，这个数组内包含着属性对应的watcher
function Dep() {
this.sub=[];
this.addSub=function (watcher) {
  this.sub.push(watcher);
}
this.notify=function () {
  this.sub.forEach(function (watcher) {
    watcher.update();
  })
}
}
//观察者，如果Observer监听到某个属性改变，则调用watcher
function Watcher(fn) {
      this.update=function () {
        Dep.target=this;
        fn();
        Dep.target=null;
      }
  this.update();
}
//监听对象的各个属性，如果属性有变更，则通知Dep，Dep根据对应的属性，找到对应的watcher
let  Observer= function (obj,key,value) {
  var dep=new Dep();
  if(Object.prototype.toString.call(value)==='[object Object]') {
    Object.keys(value).forEach(key => {
      new Observer(value, key, value[key])
    })
  }
    Object.defineProperty(obj,key,{
      enumerable:true,
      configurable:true,
      get :function () {
        if(Dep.target){
            dep.addSub(Dep.target);
        }
        return value;
      },
      set :function (newVal) {
        value=newVal;
        dep.notify();
      }
    })
}
