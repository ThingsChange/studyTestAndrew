// 引入公共资源
var baseURI = '/';
document.write('<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">');
document.write('<link rel="icon" href="' + baseURI + 'img/icon.png" type="image/png" />');

document.write('<link rel="stylesheet" href="' + baseURI + 'css/reset.css" />');
document.write('<link rel="stylesheet" href="' + baseURI + 'css/bootstrap.min.css" />');
document.write('<link rel="stylesheet" href="' + baseURI + 'css/column.css" />');
document.write('<link rel="stylesheet" href="' + baseURI + 'css/svg.css" />');
document.write('<link rel="stylesheet" href="' + baseURI + 'layui/css/layui.css" />');

document.write('<script src="' + baseURI + 'js/jquery.min.js" type="text/javascript" charset="utf-8"></script>');
document.write('<script src="' + baseURI + 'js/jquery.base64.js" type="text/javascript" charset="utf-8"></script>');
document.write('<script src="' + baseURI + 'layui/layui.js" type="text/javascript" charset="utf-8"></script>');
var userType = "", layer, userId = "", captcha;

var layIndex = 0;
var isLoad = true;
var $baseParam = {version: '', di: ''};
var writeMenuHtml = (function (userInfo) {
    var menu = [];
    if (userInfo && userInfo.data && userInfo.data.user) {
        var user = userInfo.data.user;
        var typeCN = '';
        userType = user.type;
        userId = user.id;
        !userId?userId=user.userId:null;
        if (user.type == '1') {
            typeCN = '托管人';
        } else if (user.type == '2') {
            typeCN = '托管人经办人';
        } else if (user.type == '3') {
            typeCN = '管理人';
        } else if (user.type == '4') {
            typeCN = '募集经办人';
        } else if (user.type == '5' || user.type == '6') {
            typeCN = '投资人';
        }
        // else if (user.type == '7'){
        //     typeCN = '复核人';
        // }else if (user.type == '8'){
        //     typeCN = '管理人';
        // }else if (user.type == '9'){
        //     typeCN = '投资人';
        // }

        var topHtml = '';
        topHtml += '<form action="" method="get">		';
        topHtml += '<div class="head_bg">		';
        topHtml += '<div class="top_ti_b clearfix" >		';
        topHtml += '<div class="fl top_ti_b_l">		';
        topHtml += '<img src="' + baseURI + 'img/logo.png" width="195" height="46" onclick="goto(\''+baseURI+'html/welcome.html\')"/>';
        topHtml += '</div>';
        topHtml += '<div class="fl menu-box"><ul id="menu" class="menu-style"></ul></div>';
        topHtml += '<div class="fr top_ti_b_r">		';
        topHtml += '	<a href="' + baseURI + 'html/userInfo.html" class="user_a_bg clearfix" id = "userInfo">		';
        topHtml += '	<p class="user_icon fl"><img src="' + baseURI + 'img/dz_logo.png" width="40" height="40" /></p>		';
//		if(!user.handImage){
//			topHtml += '	<img src="../img/touxiang.png" width="40" height="40" alt="" />		';
//		}
        topHtml += '  <div class="head_font fl">	';
        topHtml += '  <p title="'+user.userName+'">' + user.userName + '</p>		';
        if (user.agency && user.agency.name) {
            $('#saveFundFormAgen').html('<option value="1">' + user.agency.name + '</option>');
            topHtml += ' 	<p title="'+user.agency.name + '：' + typeCN+'">' + user.agency.name + '：' + typeCN + '</p>	';
        } else {
            topHtml += ' 	<p title="'+typeCN+'">' + typeCN + '</p>	';
        }
        topHtml += '	</div>		';
        topHtml += '	</a>		';
        // topHtml += '<div class="head_font01 fl" onclick = "goto(&quot;' + baseURI + 'html/noticeList.html&quot;)">';
        // topHtml += '<img src = "' + baseURI + 'img/xiaoxi.png">';
        // topHtml += '<a href="javascript:void()"><span>&nbsp;&nbsp;系统消息</span></a>';
        // topHtml += '</div>';

        topHtml += '<div class="close_bg fr">	';
        topHtml += '	<a href="javascript:void(0)" onclick="initLoginOut()" class="hover-green">	';
        topHtml += '	<span class="icon-tuichu"></span>		';
        topHtml += '	<span class="exit_font">退出</span>		';
        topHtml += '	</a>		';
        topHtml += '</div>		';
        topHtml += '</div>		';
        topHtml += '</div>		';
        topHtml += '</div>		';
        topHtml += '</form>			';
        $("#top").html(topHtml);
        var footHtml = '<p>© 2017 中证私募基金电子签约平台 | 京ICP备15051231号-2 | <a href="">隐私声明</a> | <a href="">法律声明</a> | <a href="">举报问题</a> | <a href="">帮助</a> | 反馈</p>';
        // $(".footer_b").html(footHtml);
        //先将修改密码隐藏,只有在账号信息显示
        $('#modifyPwdId').hide();
    }


})

function initLoginOut(e) {
    $baseParam.data = {};
    $.ajax({
        url: "/user/logout.do",
        type: "POST",
        data: JSON.stringify($baseParam),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            if(res.code=="0000"){
                location.href = "/";
            }
        },
        error: function (result) {

        }
    });
}

function initMenuHtml(result) {
    if (!result || result.code != '0000') {
        return;
    }
    var menuHtml = "";
    var menu = result.data;
    var locationUrl = location.href;
    for (ss in menu) {
        if (!menu[ss].pid) {
            if (menu[ss].icon && menuHtml == "") {
                var selectClass = "";

                if (locationUrl.indexOf(menu[ss].href) >= 0) {
                    selectClass = "current";
                }
                menuHtml += '<li class="relative"><a  class="' + selectClass + '"   menuCode="' + menu[ss].code + '" href=javascript:goto("' + menu[ss].href + '")'
                    + '><span class="' + menu[ss].icon + '"></span><span class="span_ft">'
                    + menu[ss].name + '</span></a>';
            } else {
                if (menu[ss].code == '116') {
                    menuHtml += '<li class="relative"><a menuCode="' + menu[ss].code + '" href=javascript:alertMSG("该功能即将上线") ><span class="'
                        + menu[ss].icon + '"></span><span class="span_ft">' + menu[ss].name + '</span></a>';
                } else {
                    menuHtml += '<li class="relative"><a menuCode="' + menu[ss].code + '" href=javascript:goto("' + menu[ss].href + '") ><span class="'
                        + menu[ss].icon + '"></span><span class="span_ft">' + menu[ss].name + '</span></a>';
                }
            }
            var _html='';
            for (s in menu) {
                selectClass = "";
                if (menu[ss].id == menu[s].pid) {
                    if (locationUrl.indexOf(menu[s].href) >= 0) {
                        selectClass = "current";
                    }
                    if (menu[s].code == 'CONTACT_MANAGEMENT') {
                        var menuName = menu[s].name;
                        if (userType == '1' || userType == '2') {
                            //托管部门
                            menuName = '托管客户';
                        } else if (userType == '3' || userType == '4') {
                            //管理部门
                            menuName = '投资人名录';
                        }
                        _html += '<li><a  class="' + selectClass + '"  menuCode="' + menu[s].code + '" href=javascript:goto("' + menu[s].href + '") >' + menuName
                            + '</a></li>';
                    } else {
                        _html += '<li><a  class="' + selectClass + '"  menuCode="' + menu[s].code + '" href=javascript:goto("' + menu[s].href + '") >' + menu[s].name
                            + '</a></li>';
                    }
                }
            }
            if(_html){
                menuHtml+='<div class="place-use"></div><ul class="menu-child">'+_html+'</ul></li>';
            }

        }
    }
    menuHtml+='<li class="relative"><a href="javascript:goto(\'/html/noticeList.html\')"><span class="icon-youxiang svg_icon"></span><span class="span_ft">系统消息</span></a></li>'
    $("#menu").html(menuHtml);


}

function getMenuData() {

    initAjaxData('/user/userInfo.do', {}, false, writeMenuHtml);
    initAjaxData('/user/permission/getWebMenu.do', {}, false, initMenuHtml);
    footerTemplete();
}

// 页面公共跳转
var goto = function (url) {
    if (url == "") {
        return;
    }
    if (!url) {
        location.href = baseURI + "login/login.html";
    }
    if (url.indexOf("/static/") > -1) {
        url = url.substring(7);
    }
    var rand = Math.random();
    if (url.indexOf("?") >= 0) {
        var x = GetQueryString("x");
        if (!x) {

            location.href = url + "&x=" + rand;
        } else {
            location.href = url;
        }
    } else {
        location.href = url + "?x=" + rand;
    }
}
/**
 *
 * @param url
 *            后台要请求的数据
 * @param params
 *            像后台提交的参数
 * @param pageDivId
 *            分页DIV的ID
 * @param datasCallBack
 *            执行业务逻辑的回调函数
 * @returns
 */
var pageE;

function toPage(url, params, pageDivId, datasCallBack,pageNum) {
    $baseParam.data = params;
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify($baseParam),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.code == '0000') {
                if (typeof (datasCallBack) == "function") {
                    var page = $("#pageId");
                    if (!page) {
                        var paegHtml = '<div   id="pageId"></div>';
                        $("#" + pageDivId).next().remove();
                        $("#" + pageDivId).after(paegHtml)
                    }
                    // 根据后台返回数据初始化分页插件
                    // 完整功能
                    layui.use(['laypage'], function () {
                        var laypage = layui.laypage,
                            layer = layui.layer;
                        var _limit;
                        pageNum?_limit=pageNum:_limit=10;
                        pageE = laypage.render({
                            elem: 'pageDiv',
                            count: result.data.total,
                            layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
                            limit:_limit,
                            limits: [2, 10, 20],
                            jump: function (obj, first) {

                                if (!first) { // 一定要加此判断，否则初始时会无限刷新
                                    if(pageNum){
                                        params.pageNum = obj.curr;
                                        params.pageSize = obj.limit;
                                        initPageData(url, params, datasCallBack);
                                        return false;
                                    }
                                    params.pageNum = obj.curr;
                                    params.pageSize = obj.limit;
                                    // 像后台请求数据并重写表格 html 由 datasCallBack
                                    // 回调函数来执行业务
                                    initPageData(url, params, datasCallBack);
                                }
                            }
                        });
                    });

                    datasCallBack(result);
                }

            } else if (result.code == '007' || result.code == '008') {
                return toreloginPage();
            } else {
                alertMSG(result.msg);
            }
        },
        error: function () {
            alertMSG(result.msg);
            // console.log("initPageData ERROR 程序猿罢工了2...");
        }
    });

}

function toreloginPage() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android-OTC-tech') > -1 || u.indexOf('Adr-OTC-tech') > -1; //android终端
    var isiOS = u.indexOf('iOS-OTC-tech') > -1 || u.indexOf('ios-OTC-tech') > -1; //ios终端
    if (isiOS) {
        window.webkit.messageHandlers.LogonIdentityExpired.postMessage('请重新登录');
        return false;
    }
    if (isAndroid) {
        window.android.LogonIdentityExpired("请重新登录");
        return false;
    }
    alertMSG("登录过期，请重新登录");
    var d = setTimeout(function () {
        goto(baseURI + "html/welcome.html")
    }, 1000);
}

// function toInvitePage() {
//     goto(baseURI + "html/invite.html");
// //	return false;
// }

/**
 * *公共分页函数 *url:后台地址 *params:传递的参数 *pageDivId:分页插件的DivId *datasCallBack:你自己编写的
 * 输出html table的函数(需使用匿名函数来建立)如下: datasCallBack=(function(result) { var
 * tablehtml=""; for(ss in result.data){ tablehtml+="<div
 * class='row'>这是一行数据"+result.data[ss].xx+"</div>" } });
 */
function initPageData(url, params, datasCallBack) {
    $baseParam.data = params;
    var index;
    if (isLoad) {
        index = start();
    }
    if (i == 0 && isLoad == false) {
        index = start();
    }

    i = i++;
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify($baseParam),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (typeof (datasCallBack) == "function") {
                // console.log("initPageData", result)
                if (result && !result.code != "0000") {
                    if (result.code == '007' || result.code == '008') {
                        return toreloginPage();
                    }  else {
                        alertMSG(result.msg);
                    }
                } else {
                    if (result)
                        datasCallBack(result);
                    //
                }
            } else {
                alertMSG(result.msg);
                var t = setTimeout(function () {
                }, 2000);
            }
            close(index);
        },
        error: function (result) {
            _sendStatus=true;
            close(index);
            if (result && result.msg) {
                alertMSG(result.msg);
            } else {
                alertMSG("coding error");
            }
            // console.log("initPageData ERROR 程序猿罢工了... url=" + url);

        }
    });
}

/**
 *
 * @param url
 *            请求地址
 * @param params
 *            需要的传参
 * @param async
 *            是否异步
 * @param datasCallBack
 *            请求完成后的回调函数
 * @returns
 */
var i = 0;

function initAjaxData(url, params, async, datasCallBack, contentType,method,token) {
    $baseParam.data = params;
    var index;
    if (isLoad&&!token) {
        index = start();
    }
    i = i++;
    var _method=(!method)?"POST":"GET"
    $.ajax({
        url: url,
        type: _method,
        data: JSON.stringify($baseParam),
        contentType: contentType == null ? "application/json;charset=utf-8" : contentType,
        dataType: "json",
        async: async == null ? true : false,
        beforeSend:function(request){
            !token?token="":null;
            request.setRequestHeader("token", token);
        },
        success: function (result) {
            if (typeof (datasCallBack) == "function") {
                // console.log("initAjaxData", result)
                if (result && result.code != "0000") {
                    if (captcha)
                        captcha();
                    if (result.code == '007' || result.code == '008') {
                        return toreloginPage();
//						goto("/static/login/login.html");
                    }  else if(result.code ==1||result.code =="1049"){
                        datasCallBack(result);
                    }else {
                        alertMSG(result.msg);
                    }
                } else {
                    if (result) {
                        datasCallBack(result);
                    } else {
                        alertMSG("服务崩溃了,紧急维护ing~~~~");
                    }
                    // var t =
                    // setTimeout(function(){goto(window.location.href);},2000);
                }
            } else {
            }
            !token?close(index):null;
        },
        error: function (result) {
            !token?close(index):null;
            if (result && result.msg) {
                alertMSG(result.msg);
            } else {
                alertMSG("coding error");
                return;
            }
            // console.log("initAjaxData ERROR 程序猿罢工了... url=" + url);
        },

        complete:function(){
            !token?close(index):null;
            statusNewUse=true;
        }
    });
}

function start() {
    isLoad = false;
    layui.use('layer', function () {
        layer = layui.layer;
        if (!layIndex) {
            var index = layer.load(0);
            layIndex = index;
            isLoad = true;
        }

        return index;
    });
}

function close(layIndexs) {

    layui.use('layer', function () {
        layer = layui.layer;
        if (layIndexs) {
            layer.close(layIndexs);
        } else {
            if (layIndex) {

                layer.close(layIndex);
            } else {
                layer.close(0);
            }
        }
        layer.close();
    });
    layIndex = '';
    isLoad = true;
}

function alertMSG(msg) {
    layui.use('layer', function () {
        var layer = layui.layer;

        if (msg) {
            layer.msg(msg);
        }
    });
}


/**
 * 获取url后参数
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the
    // clock_seq_hi_and_reserved
    // to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

/**
 * 得到所有查询参数字符串
 *
 * @returns
 */
function getSearch() {
    var url = window.location.search;
    if (url) {
        var length = url.length;
        url = url.substring(0, 1) == "?" ? decodeURIComponent(url.substring(1, length)) : decodeURIComponent(
            url.substring(0, length));
    }
    return "?" + url;
}

/**
 * 得到查询参数对象
 *
 * @returns
 */
function getSearchObj() {
    var url = getSearch();
    var searchObj = {};
    if (url) {
        // 去掉?号
        url = url.substr(1);
        if (url.length > 0) {
            var arr = url.split("&");
            for (var i = 0; i < arr.length; i++) {
                var keyVal = arr[i];
                if (keyVal && keyVal.length > 0 && keyVal.indexOf("=") > 0) {
                    var keyValArr = keyVal.split("=");
                    var key = keyValArr[0];
                    var val = keyValArr[1];
                    searchObj[key] = val;
                }
            }
        }
    }
    return searchObj;
}

// 退出登录
function doLogout() {
    bootbox.confirm({
        buttons: {
            confirm: {label: '确认'},
            cancel: {label: '取消'}
        },
        message: '确定要退出登录吗？',
        callback: function (result) {
            if (result) {
                doLogoutNow();
            }
        }
    });
}

// 立刻退出
function doLogoutNow() {
    var params = {};
    $.ajax({
        type: "POST",
        url: '/logout',
        cache: false,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(params),
        dataType: "json",
        success: function (result) {
            if (result.code == '0000') {
                window.location.href = "/";
            } else {
                layer.msg(result.msg || '操作失败');
            }
        }
    });
}

// 初始化日期控件--layDate by zhangli
function initLayDate(divId, dateFormat) {
    dateFormat = dateFormat == "" ? "yyyy-MM-dd HH:mm" : dateFormat;
    // 限定可选日期
    var ins22 = laydate.render({
        elem: '#' + divId
        , type: 'datetime' // 日期格式为 年月日 时分 默认 年月日
        , format: dateFormat
        , min: 1   // 如果可以选择当天 为0 不能为1 前一天 -1 以此类推
        , btns: ['clear', 'confirm']
        , ready: function () {
            ins22.hint('日期不能选择当天以前的日期（含当天）');
        }
    });
    // 前后若干天可选，这里以7天为例
    /*
     * laydate.render({ elem: '#'+divId ,min: 1 ,btns: ['clear', 'confirm'] });
     * //限定可选时间 laydate.render({ elem: '#'+divId ,type: 'time' ,min: '09:00:00'
     * ,max: '19:00:00' ,btns: ['clear', 'confirm'] });
     */
}

function noData() {
    var noHtml = "";
    noHtml += '<div class="norecord-out-bg">';
    noHtml += '<div class="norecord-com-bg">';
    noHtml += '<img src=' + baseURI + '"img/norecord.png" width="191" height="183" alt="" />';
    noHtml += '</div>';
    noHtml += '</div>';
    return noHtml;
}

window.onload = function () {

    $(".main_content_fl").height($(window).height() - 171);
    $(window).resize(function () {
        $(".main_content_fl").height($(window).height() - 171);
    });
};

function butTimer(but) {
    but.disabled = true;
    setTimeout(function () {
        but.disabled = false;
    }, 2000);
}

/**
 * footer js
 */
function footerTemplete(){
    var _html='<div class="footer_body"> <div class="main_body_div">'
        +'<div class="row text-left">'
        +'<div class="col-sm-3">'
        +'<div class="m-b-20 jieshao footer_box"><a href="http://www.interotc.com/portal/newportal/gywm.html" ><img src="../img/xiaodian.png"><strong style="color: white">公司介绍</strong></a></div>'
        +'</div>'
        +'<div class="col-sm-3">'
        +'<div class="m-b-50 m-t-50 xinwen footer_box"><a href="http://www.interotc.com/portal/newportal/xxfb.html "><img src="../img/xiaodian.png"><strong style="color: white">支持新闻</strong></a></div>'
        +'</div>'
        +'<div class="col-sm-3">'
        +'<div class="m-b-50 m-t-50 lianxi footer_box"><img src="../img/xiaodian.png"><strong>联系我们</strong></div>'
        +'<div class="phone">'
        +'<div class="m-botm-5" style="color: #999999">010-83897809</div>'
        +'<div class="m-botm-5" style="color: #999999">010-83897914</div>'
        +'<div class="m-botm-5" style="color: #999999">010-83897867</div>'
        +'<div class="m-botm-5" style="color: #999999">010-83897969（传真）</div></div>'
        +'</div>'
        +'<div class="col-sm-3">'
        +'<div class="m-b-50 m-t-50 xiazai footer_box"><img src="../img/xiaodian.png"><strong>下载手机APP</strong></div>'
        +'<div class="android"><img src="../img/android.png"><div class="android_wechat wechat"><img src="../img/android-AppStore.png"></div> </div> '
        +'<div class="iphone"><img src="../img/iphone.png"><div class="iphone_wechat wechat"><img src="../img/iOS-AppStore.png"></div> </div> '
        +'<div class="m-b-50">'
        +'</div></div></div></div></div>';
    var _footer=$("#footer");
    _footer?_footer.append(_html):null;

    $(".footer_body .main_body_div .android").hover(function () {
        $(this).find("div").show();
    },function(){
        $(this).find("div").hide();
    });
    $(".footer_body .main_body_div .iphone").hover(function () {
        $(this).find("div").show();
    },function(){
        $(this).find("div").hide();
    });
}

