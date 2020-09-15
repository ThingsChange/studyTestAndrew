class factory{
  constructor(options){
      this.store=options;
  }
  transferIn(cargo){
   let newCargo=this.flatObj(cargo);
   let helper=function(obj,path){
     (new Function(`try { return ${obj}.${path}=${newCargo[path]} } catch(e) {}`))()
   }
   for (let [key,value] of Object.entries(newCargo)){

    }
  }
  transferOut(userId){

  }
  flatObj(obj){
    let shopName={};
    let dps=function(obj,path){
      for(let [key,value] of Object.entries(obj)){
        let newKey=path!==''?`${path}.${key}`:key;
        if(typeof value==="number"){
          shopName[newKey]=value;
        }else{
          dps(value,newKey)
        }
      }
    }
    dps(obj,'')
    return shopName
  }
}
var fa=new  factory();
fa.transferIn({
    productA:{
      a:1,
      b:2,
      c:{
        c1:1,
        c2:3
      }
  },
    productB:{
      e:6
    }
})
