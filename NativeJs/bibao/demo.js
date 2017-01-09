/**
 * Created by Andrew on 2016/12/26.
 */

/**
 *
 *----------Dragon be here!----------/
 * 　　　┏┓　　　┏┓
 * 　　┏┛┻━━━┛┻┓
 * 　　┃　　　　　　　┃
 * 　　┃　　　━　　　┃
 * 　　┃　┳┛　┗┳　┃
 * 　　┃　　　　　　　┃
 * 　　┃　　　┻　　　┃
 * 　　┃　　　　　　　┃
 * 　　┗━┓　　　┏━┛
 * 　　　　┃　　　┃神兽保佑
 * 　　　　┃　　　┃代码无BUG！
 * 　　　　┃　　　┗━━━┓
 * 　　　　┃　　　　　　　┣┓
 * 　　　　┃　　　　　　　┏┛
 * 　　　　┗┓┓┏━┳┓┏┛
 * 　　　　　┃┫┫　┃┫┫
 * 　　　　　┗┻┛　┗┻┛
 * ━━━━━━神兽出没━━━━━━
 */



//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//
//
//



// FUCK YOU
// _                      _
// |_|                    |_|
// | |       /^^^\        | |
// _| |_    (| "o" |)     _| |_
// _| | | | _  (_---_)   _ | | | |_
// | | | | |' |  _| |_   | `| | | | |
// |          |/       \ |          |
// \        // /(. .)\ \ \        /
// \     / / / | . | \ \ \     /
// \   \/ /  ||Y||  \ \/   /
// \____/   || ||   \____/
// () ()
// || ||
// ooO Ooo
















var Greeters = [];
var i = 0;
for ( ; i < 10 ; i++) {
   /* Greeters.push(function () {
        return console.log(i)
     })*/
    Greeters.push(console.log.bind(null,i))
}

Greeters[0](); // 10
Greeters[1](); // 10
Greeters[2](); // 10
/*















if (a && a.b && a.b.c) {
    var result = a.b.c.d;
}
*/

function AS(){
    this.b=2;
    this.seta=function(){
        this.b=this.b+1;
    }
    var a=1;
    function B(){
        console.log("a==="+a);
        return a;
    }
    return B;
}

new AS();
AS()();



function a(num1,num2,num3){
    console.log(num1,num2,num3)
}
var b={}

a.call(b,1,2,3);

//写个bind d用法



function b(num) {

    return 1+num;
}
b(2);



var c = a.bind(null,1,2);



c(3);


if(!Function.prototype.bind){
    Function.prototype.bind=function (context) {
        var outArgs=[].slice.call(arguments,1);//1,2
        var self=this;//function  a
        var bound=function () {
            console.log("我被重写啦");
            self.apply(context,outArgs.concat[[].slice.call(arguments)]);//123//this:
        }
        return bound;
    }
}































Function.prototype.bind=function (context) {
    var args = [].slice.apply(arguments,[1]);
    var self = this;
    var bound = function(){
        return self.apply(context,args.concat([].slice.apply(arguments)));
    }
    return bound;

}
function a(num1,num2,num3){
    console.log(num1+num2+num3)
}
var obj={};

var b = a.bind(obj,1,2);
b(3);