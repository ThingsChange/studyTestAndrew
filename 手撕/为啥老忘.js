/**
 *
 * @author  晴云
 * @create 2021-09-03 15:17
 * @note 干什么的呢？
 **/
function _instanceOf(instance, con) {
    if (instance === null) return false
    if (!['object', 'function'].includes(typeof con) || con === null)
        throw new Error('Right-hand side of  _instanceof is not an object')
    let proto = con.prototype
    while (instance) {
        if (instance === proto) return true
        instance = Reflect.getPrototypeOf(instance)
    }
    return false
}
let A = function () {}
let a = new A()
console.assert(!_instanceOf(a, A), '正确')

//事件代理
/*
document.getElementById('wrapId').onClick=function (event){
  event = event || window.event;
  let target = event.target || event.srcElement;
  if(target.targetName.toLowerCase() === 'xxx'){
    let a=1;
  // todo 暂时这样写，配合调试用不适应生产，待生成上线时删除
    {
      a=2;
    }
  }
}*/

//flatten

let flatten = function (arr) {
    return arr.reduce(
        (res, value) =>
            res.concat(Array.isArray(value) ? flatten(value) : value),
        []
    )
}
console.log(
    '这里是   flatten([1,2,3,[4,5,[6]]])  ------------',
    flatten([1, 2, 3, [4, 5, [6]]])
)

//深拷贝

let deepCopy = function (obj, map = new WeakMap()) {
    if (map.get(obj)) return map.get(obj)
    let result = {}
    if (obj instanceof Object) {
        if (Array.isArray(obj)) {
            result = []
        } else if (typeof obj === 'function') {
            result = function (...args) {
                return obj.bind(this, args)
            }
        } else if (obj instanceof RegExp) {
            result = new RegExp(obj.source, obj.flags)
        } else if (obj instanceof Date) {
            result = new Date(obj)
        }
        map.set(obj, result)
        Reflect.ownKeys(obj)
            .filter(v => obj.propertyIsEnumerable(v))
            .forEach(key => {
                result[key] = deepCopy(obj[key])
            })
        return result
    } else {
        return obj
    }
}
let v = Symbol(1)
let d = {
    x: 1,
    [v]: 2,
}
let c = deepCopy(d)
console.log(c)
console.log('这里是   c[v] === d[v]  ------------', c[v] === d[v])

let arr = [1, 2, 3, 45, 5, 2, 3, 4, 51, 23]
let quickSort = function (arr) {
    let len = arr.length
    if (len <= 1) return arr
    let mid = len >> 1
    let midValue = arr.splice(mid, 1)
    let left = [],
        right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < midValue) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(midValue).concat(quickSort(right))
}
// console.log('这里是   quickSort([1,2,3,45,5,2,3,4,51,23])  ------------', quickSort(arr))

//归并排序
let mergeSort = function (arr) {
    let len = arr.length
    if (len <= 1) return arr
    let mid = len >> 1
    let left = arr.slice(0, mid)
    let right = arr.slice(mid)
    return merge(mergeSort(left), mergeSort(right))
}
let merge = function (left, right) {
    let result = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    return result.concat(left).concat(right)
}
console.log('这里是   mergeSort(arr)  ------------', mergeSort(arr))

//用setTimeout实现setInterval
let timers = {}
let mySetInterval = function (func, wait, ...args) {
    let content = this
    let key = Symbol()
    let exec = function () {
        func.apply(content, args)
        timers[key] = setTimeout(() => {
            exec()
        }, wait)
    }
    timers[key] = exec(func, wait)
    return key
}
let clearMyInterval = function (timerId) {
    if (timerId in timers) {
        clearTimeout(timers[timerId])
    }
    delete timers[timerId]
}

function debounce(func, delay) {
    let timer = null
    return function (...args) {
        let content = this
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(content, args)
        }, delay)
    }
}

let throttle = function (func, delay) {
    let timer = null,
        last = 0,
        remain = 0
    return function (...args) {
        let context = this
        let now = +new Date()
        remain = delay - (now - last)
        if (remain <= 0) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            func.apply(context, args)
            last = Date.now()
        } else {
            clearTimeout(timer)
            timer = null
            timer = setTimeout(func, remain)
        }
    }
}

let assign = (target, ...sources) => {
    if (target === undefined || target === null) {
        throw new Error('Cannot convert undefined or null to object')
    }
    let to = Object(target)
    for (let obj of sources) {
        let keys = Reflect.ownKeys(obj)
        for (let key of keys) {
            if (Object.prototype.propertyIsEnumerable.call(obj, key)) {
                to[key] = obj[key]
            }
        }
    }
    return to
}
a = { x: 1 }
b = { y: 2 }
c = { z: 2 }
Object.defineProperty(c, 'z', { enumerable: false, value: 3 })
console.log('这里是   assign(a,b,c)  ------------', assign(a, b, c))
