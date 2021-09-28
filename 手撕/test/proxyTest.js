/**
 *
 * @author  晴云
 * @create 2021-04-28 15:17
 * @note 干什么的呢？
 **/

let objPro = { zhiye: '卖萌' }
let obj = Object.create(objPro, {
    name: {
  value: '滚滚',
    writable: true,
        enumerable: false,
        configurable: true,
    },
})
obj.type = '熊'
obj.getName = function () {
    console.log('这里是 原始的name 的结果-------------', this.name)
    return this.name
}
let res = new Proxy(obj, {
    get(target, proxyKey, receiver) {
        // console.log('这里是   target  ------------', target)
        // console.log('这里是   receiver  ------------', receiver)
        // return "浴火重生" + target[proxyKey]
        return Reflect.get(target, proxyKey, receiver)
    },
    set(target, p, value, receiver) {
        console.log('这里是 瞎比改 的结果-------------', '√')
        target[p] = '别瞎改。'
    },
    // getOwnPropertyNames 获取当前对象自身所有非Symbol类型的属性
    // getOwnPropertySymbols 获取当前对象自身所有Symbol类型的属性
    // for in 自身加原型链的  所有可枚举属性
    // Object.keys() 自身可枚举的属性
    ownKeys(target) {
        console.log('这里是 1111 的结果-------------', 1111)
        return ['x', 'type']
    },
})
// res.name= 2
/* console.log('这里是   res  ------------', res.name,obj)
console.log('这里是   Object.getOwnPropertyNames(obj)  ------------', Object.getOwnPropertyNames(obj))
console.log('这里是   Object.keys(res)  ------------', Object.keys(res),Object.getOwnPropertyNames(res))*/

for (let i in res) {
    console.log('这里是 i 的结果-------------', i)
    // console.log('这里是   Object.getOwnPropertyDescriptor(res,i)  ------------', res.hasOwnProperty(i))
}

console.log('这里是   Object.keys(obj)  ------------', Object.keys(res))
console.log(
    '这里是   Object.getOwnPropertyNames(res)  ------------',
    Object.getOwnPropertyNames(res)
)
