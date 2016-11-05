/**
 * Created by wanglijun on 2016/9/27.
 */
function parentObj(){
    this.name="parent";
    this.colors=["red","blue","black"];
}
function sonObj(){

}
sonObj.prototype=new parentObj();
var sonObj1=new sonObj();
sonObj1.colors.push("green");
sonObj1.name="son1";
var sonObj2=new sonObj();
console.log(sonObj2.colors);
console.log(sonObj2.name);



