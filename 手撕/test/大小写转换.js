/**
*
* @author  晴云
* @create 2021-06-06 16:05
* @note 干什么的呢？
**/

let  strs= 'aBc'
function translate(str){
  let res=[];
  for(let i=0,len=str.length;i<len;i++){
    res.push(String.fromCharCode(str[i].charCodeAt()^32))
  }
  return res.join('')
}

console.log(translate(strs));
