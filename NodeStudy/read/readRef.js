/**
 *
 * @author  晴云
 * @create 2020-05-14 9:08
 * @note 干什么的呢？
 **/


let path = require("path");
let fs = require("fs");

let pathName = "E:\\workSpace\\fe-online-restaurant\\.git\\logs\\refs\\remotes\\origin";
fs.readdir(pathName, function(err, files){
  let dirs = [];
  (function iterator(i){
    if(i == files.length) {
      dirs = dirs.filter(item=>!['dev','master','dohko','优惠券超收','浏览器','沙雕','推荐有礼四期'].includes(item))
      dirs.forEach(item=>{
        console.log('git branch -D  '+item)
      })

      dirs.forEach(item=>{
        console.log('git push -d origin '+item)
      })
      return ;
    }
    fs.stat(path.join(pathName, files[i]), function(err, data){
      if(data.isFile()){
        dirs.push(files[i]);
      }
      iterator(i+1);
    });
  })(0);
});
