let a = '2'
var v=3;

function b(x) {
    switch (x) {
        case 1:
            console.log(1)
            break
        default:
            if (!x) {
                console.log('这里是 123 的结果-------------', 123)
            }
            console.log('这里是 2 的结果-------------', 2)
    }
}

b(1)
