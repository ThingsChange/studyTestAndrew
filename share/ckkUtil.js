/**
 *
 * @author  56477
 * @create 2018-01-17 13:41
 * @note 工具类
 **/
export let  now = Date.now || function() {
    return new Date().getTime();
};
//防抖处理
export let  debounce = function(func, wait, immediate) {
    // immediate默认为false
    var timeout, args, context, timestamp, result;
    var later = function() {
        // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
        var last = now() - timestamp;
        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };
    return function() {
        context = this;
        args = arguments;
        timestamp =now();
        // 第一次调用该方法时，且immediate为true，则调用func函数
        var callNow = immediate && !timeout;
        // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
};

//判断是否登录
export let isLogin= function () {
    return +$('#login-status').attr('content')!==0
};

export let getCaptcha=function (){
    // return new  Promise((resolve,reject)=>{
        let $this= $(this);
        $.client({
            url: '/captcha/' + $this.attr('data-type') + '?refresh=1',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                //不好
                $this.attr('src', data.url).parent().removeClass('hide');
                // $('#captchaPic').attr('src', data.url).parent().removeClass('hide');
            },
            error: function (xhr) {
            }
        });
    // })
};

export  let  GetRequest=()=> {
    let url = location.search; //获取url中"?"符后的字串
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
        let str = url.substr(1);
        let strs = str.split("&");
        for(let i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

//获取时间区间
export  let  timeSection=(startTime,endTime)=>{
    let startTimeH=+startTime.slice(0,startTime.indexOf(':'))
    let endTimeH=+endTime.slice(0,endTime.indexOf(':'))

    let timeArrray=[startTime]
    let temp=endTimeH-startTimeH;
    for(let i=0;i<temp;i++){
        startTimeH=startTimeH+1;
        timeArrray.push((startTimeH)+":00")
    }
    if((startTimeH)+":00"===endTime){
    }else{
        timeArrray.push(endTime);
    }
    return timeArrray;
}

