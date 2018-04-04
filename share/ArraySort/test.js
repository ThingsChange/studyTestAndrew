/**
 *
 * @author  56477
 * @create 2018-04-04 10:59
 * @note n!有几个0；
 **/

var  getZeroSize=function (n) {
    var sum=jiecheng(n);
    console.log(sum);
    var length=(sum+'').length;
    var temp=sum/Math.pow(10,length)
    temp+='';
    var tempLength=temp.length;
   if(temp.includes('.')){
       tempLength--;
       if(temp.indexOf('0')===0){
           tempLength--;
       }
    }
    return length-tempLength;

}
var a=[];
var jiecheng=function (n) {
    if(n==0||n==1) {
        a[n]=1;
        return 1;
    }
    if(a[n-1]){
        return  n*a[n-1];
    }else{
        return n*jiecheng(n-1);
    }
}
getZeroSize(12);

var  getZeroSize=function (n) {
    var sn=n+'';
    if (n.slice(-1)<5){//
        return parseInt(sn/10);
        if()
    }

}

