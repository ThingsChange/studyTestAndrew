/**
 *
 * @author  晴云
 * @create 2020-05-14 9:08
 * @note 干什么的呢？
 **/


let path = require("path");
let fs = require("fs");
//根据远程分支
// let pathName = "E:\\workSpace\\fe-online-restaurant\\.git\\logs\\refs\\remotes\\origin";
let pathName = "E:\\workSpace\\fe-online-restaurant\\.git\\logs\\refs\\heads";
fs.readdir(pathName, function(err, files){
  let dirs = [];
  (function iterator(i){
    if(i == files.length) {
      dirs = dirs.filter(item=>!['dev','master','dohko','dohkoTest','0527分支','放弃吧','企业微信'].includes(item))
      dirs.forEach(item=>{
        console.log('git branch -D  '+item)
      })
      //其实就是带个回车
      console.log()
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
