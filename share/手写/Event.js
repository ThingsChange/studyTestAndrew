/**
 *
 * @author  晴云
 * @create 2020-09-21 9:45
 * @note 事件模型
 **/
    class Event{
      constructor(){
        this.dep={};
      }
      on(type,callBack){
        let callBackStack=this._getHandler(type).callbackStack;
        callBackStack.push(callBack)
      }
      off(type){
        this.dep[type] && delete this.dep[type]
      }
      once(type,callBack){
        let callBackStack=this._getHandler(type,true).callbackStack;
        callBackStack.push(callBack);
      }
      emit(type,...args){
        if(this.dep[type]){
          this.dep[type].callbackStack.forEach(cb=>{
            cb.call(cb,...args)
          })
          if(this.dep[type].isOnce){
            this.off(type);
          }
        }
      }
  _getHandler(eventName, isOnce = false){
    if(!this.dep[eventName]) {
      this.dep[eventName] = {
        isOnce,
        callbackStack: [],
      }
    }
    return this.dep[eventName]
  }

}
