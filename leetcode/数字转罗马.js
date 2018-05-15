/**
 *
 * @author  56477
 * @create 2018-05-11 14:19
 * @note 干什么的呢？
 **/

/**
 * @param {number} num
 * @return {string}
 * 给定一个整数，将其转换为罗马数字。输入保证在1到3999的范围内。
 */
var intToRoman = function(num) {
    if(num<1||num>3999){
        return '';
    }
    let jichu=[{
        jichu:'I',
        middle:'V',
        prev:'X',
    },{
        jichu:'X',
        middle:'L',
        prev:'C',
    },{
        jichu:'C',
        middle:'D',
        prev:'M',
    },
        {
            jichu:'M',
            middle:'',
            prev:'',
        },
    ]

    let numArra=(num+'').split('');
    let  length=numArra.length;
    let returnStr='';
    numArra.forEach((value,i,a)=>{
        value=+value;
        if(length<=0){
            return ;
        }
        let temp=jichu[length-1];
        if(value===4){
            returnStr+=temp.jichu+temp.middle;
        }else if(value===9){
            returnStr+=temp.jichu+temp.prev;
        }else if(value===5){
            returnStr+=temp.middle;
        }else if(value<4){
            returnStr+=Array(value).fill(temp.jichu,0).join('');
        }else{
            returnStr +=temp.middle+Array(value-5).fill(temp.jichu,0).join('');
        }
        length--;
    })
    return returnStr;

};

console.log(intToRoman(9));
console.log(intToRoman(149));
console.log(intToRoman(2109));
console.log(intToRoman(1994));


//别人写的更简单啊
var intToRoman = function(num) {
    var str = "";
    var weights = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var numerals= ["M",  "CM","D", "CD", "C","XC","L","XL", "X", "IX", "V", "IV", "I"];
    for(var i = 0; i < weights.length && num !== 0; i++) {
        var noOfNumeral = num / weights[i];
        for(var j = 1; j <= noOfNumeral; j++) {
            str += numerals[i];
        }
        num %= weights[i];
    }
    return str;
};