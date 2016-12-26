/**
 * Created by Andrew on 2016/12/26.
 */
const Greeters = [];
for (var i = 0 ; i < 10 ; i++) {
    // Greeters.push(function () { return console.log(i)})
    Greeters.push(console.log.bind(null,i))
}

Greeters[0](); // 10
Greeters[1](); // 10
Greeters[2](); // 10



if (a && a.b && a.b.c) {
    var result = a.b.c.d;
}

