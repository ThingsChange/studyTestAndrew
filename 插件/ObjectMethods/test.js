/**
 * Created by wanglijun on 2016/8/22.
 */
function jisuan(obj){
    var Obj1={"a":1,"b":2,"c":3};
    var Obj2={"b":3,c:1,d:"4"};
    Obj1[ $(obj).parents(".item-ii").attr("data-name")]=  Number($(obj).parents(".item-ii").attr("data-value"));
    new Object()[Symbol.for("assignObj")](Obj1,Obj2);
    console.log(Obj1);
    return Obj1;
}