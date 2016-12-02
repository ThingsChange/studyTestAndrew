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
console.log(sonObj1.name);


/*sonObj1.colors.push("green");
sonObj1.name="son1";
var sonObj2=new sonObj();
console.log(sonObj2.colors);
console.log(sonObj2.name);*/




function func(o2){
    o2.color='blue';
    o2["name"]='wlj';
    o2=new Object();
    o2.color='white';
    return o2.color;
}
var o1={color:'red'};
var result = func(o1);
console.log(o1.color,result);



