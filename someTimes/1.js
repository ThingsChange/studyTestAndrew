/**
 *
 * @author  晴云
 * @create 2020-12-02 15:32
 * @note 干什么的呢？
 **/

let b =[3, 0, 7];
let a = [5, 0];
//53271
let ans = []
        while (a.length && b.length) {
          if (a > b) ans.push(a.shift())
  else ans.push(b.shift())
}
ans = ans.concat(a, b);
console.log(ans)
