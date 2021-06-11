/**
 *
 * @author  晴云
 * @create 2021-06-07 9:04
 * @note 干什么的呢？
 **/

var x = 20

function a(y){
  var x = 10
  return get(y)
}

function get(y){
  return x + y
}

console.log(a(10))


var x = 20

function a(y){
  function get(y){
    return x + y
  }
  var x = 10
  return get(y)
}



console.log(a(10))


var a = {x:1}

const f = (b = {...a}) => {
  b.x++
}

f()
console.log(a)




var a = {x:1}

const f = (b = {...a}) => {
  b.x++
}

f()
console.log(a)

f(a)
console.log(a)
