/**
 * Created by wanglijun on 2017/1/3.
 */
function record(word){
    console.log("我输出了"+word);
}
(function(){
    setTimeout(record.bind(null,"setTimeout"),2000);
}())
