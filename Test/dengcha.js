/**
 *
 * @author  56477
 * @create 2018-03-19 15:16
 * @note 干什么的呢？
 **/

let  equalMis=(...arry)=>{
    let  isNumber=true;
    let newA=arry.map((v,i,a)=>{
        if(typeof  v ==='string'){
            isNumber=false;
            return v.charCodeAt();
        }else{
            return v;
        }
    })
    let retunArray=[];
    let length=[newA[1]-newA[0]]/newA[2];
    for(let i=0;i<=length;i++){
        retunArray.push(newA[0]+i*newA[2]);
    }
    if(!isNumber){
        retunArray=retunArray.map(v=>String.fromCharCode(v));
    }
    return retunArray;
}

//如何快速定位到某个时间点的content
var array=[
    {
        time: Number,
        content: String
    }, {
    time: Number,
    content: String
},...[]//代表很多
]


let getContentByTime=(time)=>{
    let  obj={};
    for (let item of array){
        obj[item[time]]=item[content];
    }
    return obj[time];
}






