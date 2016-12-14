/**
 * Created by wanglijun on 2016/12/5.
 */
// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
// 函数节流（如果有连续事件响应，则每间隔一定时间段触发）
// 每间隔 wait(Number) milliseconds 触发一次 func 方法
// 如果 options 参数传入 {leading: false}
// 那么不会马上触发（等待 wait milliseconds 后第一次触发 func）
// 如果 options 参数传入 {trailing: false}
// 那么最后一次回调不会被触发
// **Notice: options 不能同时设置 leading 和 trailing 为 false**
// 示例：
// var throttled = _.throttle(updatePosition, 100);
// $(window).scroll(throttled);
// 调用方式（注意看 A 和 B console.log 打印的位置）：
// _.throttle(function, wait, [options])
// sample 1: _.throttle(function(){}, 1000)
// print: A, B, B, B ...
// sample 2: _.throttle(function(){}, 1000, {leading: false})
// print: B, B, B, B ...
// sample 3: _.throttle(function(){}, 1000, {trailing: false})
// print: A, A, A, A ...
// ----------------------------------------- //
_.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options)
        options = {};
    var later = function() {
        previous = options.leading === false ? 0 : _.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout)
            context = args = null;
    };
    return function() {
        var now = _.now();
        if (!previous && options.leading === false)
            previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout)
                context = args = null;
        } else if (!timeout && options.trailing !== false) { // 最后一次需要触发的情况
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};