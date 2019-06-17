/**
 * Created by Andrew on 2017/3/7.
 */
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  // 保存旧的方法add
  const oldValue = descriptor.value;

  descriptor.value = function() {
    // 输出日志
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  // 必须返回descriptor对象
  return descriptor;
}

let math = new Math();
math.add(1, 2);
