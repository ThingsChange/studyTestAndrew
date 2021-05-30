/**
 *
 * @author  晴云
 * @create 2021-04-25 9:53
 * @note 干什么的呢？
 **/

function func() {
  const guang = 'guang';
  function func2() {
    const ssh = 'ssh';
      function func3() {
        const suzhe = 'suzhe';
        console.log('这里是   guang  ------------', guang)
        console.log('这里是   ssh  ------------', ssh)
        console.log('这里是   suzhe  ------------', suzhe)
    }
    return func3;
  }
  return func2;
}

const func2 =func();
const func3 = func2();
func3();
