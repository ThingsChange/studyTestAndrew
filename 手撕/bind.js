/**
 *
 * @author  晴云
 * @create 2020-08-28 10:41
 * @note 干什么的呢？
 **/
  let toString=Object.prototype.toString().slice(8,-1)
    Function.prototype.myBind=function () {
        let isStrict=this===undefined
      let functionTarget=this;
      let thisArg=arguments.slice(0,1)
      if(!isStrict){
          if(typeof thisArg ==='string') thisArg=new String(thisArg);
          if(typeof thisArg ==='number')thisArg=new  Number(thisArg)
          if(typeof thisArg ==='boolean')thisArg=new  Number(Boolean)
      }
      let outArg=[].slice.call(arguments,1);
      let bound=function () {
        let resetParams=[].slice.call(arguments)
          return functionTarget.apply(this instanceof bound?this:thisArg,outArg.concat(resetParams
          ));
      }
      bound.prototype=Object.create(functionTarget.prototype || Function.prototype)

      return bound;
    }

    Function.prototype.myBind=function (context,...params){
    let fnThis=this;
    if(typeof  fnThis!=="function") throw 'bind  first-param should be a function';
    let fn=function(){};
    fn.prototype=Object.create(fnThis.prototype || Function.prototype);
    return function (...otherParams){
      return  fnThis.apply(this instanceof  fn ?this:context,params.concat(otherParams))
    }
    }
