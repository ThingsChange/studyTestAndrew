/**
 *
 * @author  56477
 * @create 2018-08-06 15:29
 * @PROJECT_NAME staff - wlj
 * @note 请阐述当前文件的作用
 **/
setTimeout(function(){
  console.log('setTimeout1');
  Promise.resolve().then(()=>{
    console.log('then1');
  });
},0)
Promise.resolve().then(()=>{
  console.log('then2');
  Promise.resolve().then(()=>{
    console.log('then3');
  })
  setTimeout(function(){
    console.log('setTimeout2');
  },0)
})
//then2   then3 setTimeout1`then1   setTimeout2
