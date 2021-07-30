/**
 *
 * @author  晴云
 * @create 2021-07-28 10:59
 * @note 干什么的呢？
 **/

const body=document.body;
function getById(node,nodeIdMap =new Map()){
  if(node){
  if(node.id) nodeIdMap.set(node.id,node);
  const children = node.children || [];
  for(let  v of children){
      getById(v,nodeIdMap)
    }
  }
  return nodeIdMap;
}
getById(body).get('category--1')


// 方法2， 借助 document.createNodeIterator 可以去MDN上查看该API
const findById = id=>document.createNodeIterator(document.body,NodeFilter.SHOW_ALL,{
  acceptNode(node){
    return node.id === id?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP
  }
})
findById('category--1')
const f =  (id)=> document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ALL,
  {
    acceptNode(node) {
      return node.id === id? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  }
);

f('anyId').nextNode(); // 即可获取 任意ID 的DOM
