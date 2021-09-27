/**
 *
 * @author  晴云
 * @create 2020-10-30 11:42
 * @note 干什么的呢？
 **/
function toObject(val) {
    if (val === null || val === undefined) {
        throw new Error(
            'Object.assign cannot be called with null or undefined '
        )
    }
    return Object(val)
}

let proIsEnumerable = Object.prototype.propertyIsEnumerable
const assign = function (target, ...source) {
    let from
    let to = toObject(target)
    for (let i = 0; i < source.length; i++) {
        from = Object(source[i])
        for (let key of Reflect.ownKeys(from)) {
            if (proIsEnumerable.call(from, key)) {
                to[key] = from[key]
            }
        }
    }
    return to
}
var a = { x: 1 }
var b = { y: 2 }
var c = { z: 2 }
Object.defineProperty(c, 'z', { enumerable: false, value: 3 })
console.log('这里是   assign(a,b,c)  ------------', assign(a, b, c))
