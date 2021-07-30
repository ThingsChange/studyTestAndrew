/**
 *
 * @author  晴云
 * @create 2021-07-30 11:22
 * @note 干什么的呢？
 **/

// 假设后端同学通过接口向前端返回了天猫的行业信息，例如：
industry_list = [
  {
    "parent_ind" : "女装",
    "name" : "连衣裙"
  },
  {
    "name": "女装"
  },
  {
    "parent_ind" : "女装",
    "name" : "半身裙"
  },
  {
    "parent_ind" : "女装",
    "name" : "A字裙"
  },
  {
    "name": "数码"
  },
  {
    "parent_ind" : "数码",
    "name": "电脑配件"
  },
  {
    "parent_ind" : "电脑配件",
    "name": "内存"
  },
  {
    "parent_ind" : "内存",
    "name": "电脑"
  },
  {
    "parent_ind" : "电脑",
    "name": "台式机"
  },
]

/*为了取用方便，我们希望可以将其转换为树状格式，例如：
{
  "数码": {
  "电脑配件": {
    "内存" : {}
  }
},
  "女装" : {
  "连衣裙": {},
  "半身裙": {},
  "A字裙": {}
}
}
实现一个方法完成这个转换*/
function convert_format(data){
  let parentObj={}
  let childrenObj={}
  for(let item of data){
    if(item.parent_ind){
      (childrenObj[item.parent_ind] || (childrenObj[item.parent_ind]={}))[item.name]={}
    }else{
      parentObj[item.name]={}
    }
  }
  findParent(childrenObj,parentObj)
    return parentObj
}
function findParent(children,parent){
  for (let key of Object.keys(parent)){
    if(children[key]){
      parent[key]=children[key]
      delete children[key]
        if(Object.keys(parent[key]).length){
          findParent(children,parent[key])
        }
      }
    }
}
convert_format(industry_list);
