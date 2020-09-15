/**
 *
 * @author  晴云
 * @create 2020-09-11 17:37
 * @note 干什么的呢？
 **/

Function.prototype.bound=function (args) {
  var thisTarget=[].slice.apply(0,1)
  var outArg=[].slice.apply(args,1)
  var func=this;
  var fBound=function (arg) {
      var params=outArg.concat([].slice.apply(arg));
      return func.apply(this instanceof fBound ?this:thisTarget,params)
  }
  fBound.prototype=Object.create(func.prototype ||Function.prototype )
  // fBound.prototype.constructor=fBound;
  return fBound;
}
