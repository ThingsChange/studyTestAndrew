/**
 *
 * @author  晴云
 * @create 2021-06-13 23:58
 * @note 使用setTimeout实现setInterval
 **/

let times = {};
function  mySetInterval(func,timer){
  let key = Symbol();
  let tempFunc = function(){
    func();
    times [key] = setTimeout(tempFunc,timer)
  }
  times [key] = setTimeout(tempFunc,timer)
  return times [key] ;
}
function cancelSetInterval(timerID){
  let deleteKey;
  for (let [key,value] of Object.entries(times)){
    if(value === timerID){
      deleteKey = key;
      break
    }
  }
  delete times[deleteKey]
  clearTimeout(timerID);
}

function mySetInterVal(fn, a, b) {
  this.a = a;
  this.b = b;
  this.time = 0;
  this.handle = -1;
  this.start = () => {
    this.handle = setTimeout(() => {
      fn();
      this.time++;
      this.start();
      console.log( this.a + this.time * this.b);
    }, this.a + this.time * this.b);
  }

  this.stop = () => {
    clearTimeout(this.handle);
    this.time = 0;
  }
}

var a = new mySetInterVal(() => {console.log('123')},1000, 2000 );
a.start();
a.stop();
