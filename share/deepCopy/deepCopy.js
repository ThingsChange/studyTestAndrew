/**
 *  created by qingyun
 *  time: 2018/11/23  5:55
 *  note : 实现不同程度的深度copy
 */

// 判断是否为对象
const isObject = o => {
  return (typeof o === 'object' || typeof o === 'function') && o !== null
  // return Object.prototype.toString.call(o).slice(8, -1).toLowerCase() === 'object'
}
const deepCopy = function (obj) {
  if (!isObject(obj)) {
    throw new Error('obj不是一个对象类型啊 ')
  }
  let isArray = Array.isArray(obj)
  let cloneObj = isArray ? [] : {}
  for (let key in obj) {
    cloneObj[key] = isObject(obj[key]) ? deepCopy(obj[key]) : obj[key]
  }
  return cloneObj
}

const deepCopyReflect = function(obj) {
  if (!isObject(obj)) {
    throw new Error('obj不是一个对象类型啊 ')
  }
  let isArray = Array.isArray(obj)
  let cloneObj = isArray ? [...obj] : {...obj}
  Reflect.ownKeys(obj).forEach(key => {
    cloneObj[key] = isObject(obj[key]) ? deepCopy(obj[key]) : obj[key]
  })
  return cloneObj
}
const deepCopyParse = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function deepClone(obj, hash = new WeakMap()) {
  if (!isObject(obj)) {
    return obj
  }
  // 查表，防止循环拷贝
  if (hash.has(obj)) return hash.get(obj)

  let isArray = Array.isArray(obj)
  // 初始化拷贝对象
  let cloneObj = isArray ? [] : {}
  // 哈希表设值
  hash.set(obj, cloneObj)
  // 获取源对象所有属性描述符
  let allDesc = Object.getOwnPropertyDescriptors(obj)
  // 获取源对象所有的 Symbol 类型键
  let symKeys = Object.getOwnPropertySymbols(obj)
  // 拷贝 Symbol 类型键对应的属性
  if (symKeys.length > 0) {
    symKeys.forEach(symKey => {
      cloneObj[symKey] = isObject(obj[symKey]) ? deepClone(obj[symKey], hash) : obj[symKey]
    })
  }

  // 拷贝不可枚举属性,因为 allDesc 的 value 是浅拷贝，所以要放在前面
  cloneObj = Object.create(
    Object.getPrototypeOf(cloneObj),
    allDesc
  )
  // 拷贝可枚举属性（包括原型链上的）
  for (let key in obj) {
    console.log(key, '--------------------------')
    cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key], hash) : obj[key]
  }
  console.log('cloneObj是', cloneObj)
  return cloneObj
}
// 将之前写的 deepClone 函数封装一下
function cloneDeep(obj) {
  let family = {}
  let parent = Object.getPrototypeOf(obj)

  while (parent != null) {
    family = completeAssign(deepClone(family), parent)
    parent = Object.getPrototypeOf(parent)
  }

  // 下面这个函数会拷贝所有自有属性的属性描述符,来自于 MDN
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  function completeAssign(target, ...sources) {
    console.log('target:', target)
    sources.forEach(source => {
      let descriptors = Object.keys(source).reduce((descriptors, key) => {
        descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
        return descriptors
      }, {})

      // Object.assign 默认也会拷贝可枚举的Symbols
      Object.getOwnPropertySymbols(source).forEach(sym => {
        let descriptor = Object.getOwnPropertyDescriptor(source, sym)
        if (descriptor.enumerable) {
          descriptors[sym] = descriptor
        }
      })
      Object.defineProperties(target, descriptors)
    })
    return target
  }

  return completeAssign(deepClone(obj), family)
}

module.exports = {
  deepCopy,
  isObject,
  deepCopyReflect,
  deepCopyParse,
  cloneDeep,
  deepClone
}
