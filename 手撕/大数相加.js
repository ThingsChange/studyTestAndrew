/**
 *
 * @author  晴云
 * @create 2021-09-14 1:00
 * @note 干什么的呢？
 **/

let a = "9007199254740991";
let b = "1234567899999999999";
function add(num1,num2){
  let maxLength = Math.max(num1.length,num2.length)
  a= a.padStart(maxLength,0)
  b= b.padStart(maxLength,0)
  let sum = '';
  let t =0;
  let f=0;//f代表进位
  for(let i = maxLength-1;i>=0;i--){
    t = Number.parseInt(a[i])+parseInt(b[i])+f;
    f=Math.floor (t/10)
    sum = t%10 +sum;
  }
  if(f!==0) sum = ''+f+sum
  return sum
}

console.log(add(a, b));
