/**
 *
 * @author  晴云
 * @create 2021-06-16 10:29
 * @note 干什么的呢？
 **/

a={
  "shiqilong":"author",
  "type":123,
  "auTyQ":{
    "ty":234
  },
  "qa":{
    "ty1":123
  },
  "qa2":{
    "t1y":123
  },
  'hehe':{
    'ty':null
  }
}


// 'ty'


/*a={
  // "shiqilong":"author",
  "type":123,
  "auTyQ":{
    "ty":234
  },
  "qa":{
    "ty1":123
  }
}*/
function filterObj(target,str){
  let res = Object.keys(target).reduce((vv,v)=>{
    if(typeof target[v] === 'object'){
      let value = filterObj(target[v],str);
      if(value === undefined){
        return vv
      }
      vv[v] = value
    }else{
      if(v.includes(str)){
        vv[v] = target[v]
      }
    }
    return vv
  },{})
  return  Object.keys(res).length?res:undefined;
}

console.log('这里是  filterObj(a,ty) 的结果-------------', filterObj(a,'ty'))
// a(b(c(d())))
