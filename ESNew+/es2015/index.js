/**
 *
 * @author  56477
 * @create 2018-08-06 16:14
 * @PROJECT_NAME staff - wlj
 * @note 请阐述当前文件的作用
 **/
// 1.Array.prototype.inludes
// 用于查找数组中是否包含某个元素，包括NaN,所以比indexOf要牛逼
var arr=[1,2,3,4,'1',NaN];
arr.indexOf(NaN)===-1;//true
arr.includes(NaN)===true//true

// 2、指数函数的中缀形式
Math.pow(2,3);//8
2**3===Math.pow(2,3)//true

