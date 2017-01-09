/**
 * Created by wanglijun on 2016/12/27.
 */
var x = 1;
function foo(x, y = function() { z = 2; }) {
    var x = 3;

    y();
    console.log(x);
    console.log(z);

}
foo();