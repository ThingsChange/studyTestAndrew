/**
 *
 * @author  56477
 * @create 2018-05-18 14:44
 * @PROJECT_NAME staff - wlj
 * @note 计算字符串中   最长的连续不重复的  截取片段长度
 **/
var lengthOfLongestSubstring = function(s) {
    let result = 0, t = []
    for (var i = 0; i < s.length; i++) {

        t = t.slice(t.indexOf(s[i]) + 1)
        result = Math.max(t.push(s[i]), result)
    }
    return result
}
lengthOfLongestSubstring('pwwkew');
