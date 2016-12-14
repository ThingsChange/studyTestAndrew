
$(function () {

    rightReadRecords(5);


    //询团hover浮框显示，移走消失
    $("#group-inquiry").mouseenter(function(){
        $("#right-nav-hover").show(200);
    }).mouseleave(function(){
        $("#right-nav-hover").hide(200);
    });
    //点击top回到顶部
    $('.to-top').click(function(){
        if(!$("html,body").is(":animated")){//判断是否处于动画
            $("html,body").animate({scrollTop:0}, 500);
        }
    });
    //改变窗口大小时record-list高度自适应
    $(window).resize(function () {
        rightResize();
    }).resize();

    //点击空白询团记录隐藏
    $(document).click(function(e){
        if(e.target.id!=="right"){
            rightClose();
        }
        if(e.target.id!=="right"){
            rightClose();
        }
    });
    $("#right").click(function(){
        return false;  //阻止事件冒泡到父级DIV
    });

    //询团记录滚动条
    $('#records-list').niceScroll({
        cursorcolor: "#ccc",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "8px", //像素光标的宽度
        cursorborder: "0", //     游标边框css定义
        cursorborderradius: "8px",//以像素为光标边界半径
        autohidemode: false //是否隐藏滚动条
    });

    var niceX=_.debounce(rightReadRecords,1000,false);
    $('#records-list').scroll(niceX(2));
});

//询团记录显示
function show() {
    //ie8无动画
    if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8.")
    {
        $("#right").css("right","0");
        return;
    }

    $("#right").animate({right: 0}, 500);
    rightResize();

}
//关闭询团记录
function rightClose(){
    //ie8无动画
    if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8.")
    {
        $("#right").css("right","-270px");
        return;
    }
    $("#right").animate({right: -270}, 500);
}

//询团记录高度自适应
function rightResize(){
    var wHeight = $(window).height();
    var $right = $("#records-list");
    $right.height(wHeight-58);
}
//询团记录-收起详情
function rightPackUp(obj){
    var $record = $(obj).parent();
    $(obj).hide().prev().show();
    $record.removeClass("right-show-all");
    $record.find(".right-tel").hide();
    $record.find(".right-qq").hide();
    $record.find(".right-record-content .right-title").hide().next().hide();
    $("#records-list").getNiceScroll().resize();//收起详情后resize滚动条高度
}
//询团记录-展开详情
function rightShowAll(obj){
    var $record = $(obj).parent();
    $(obj).hide().next().show();
    $record.addClass("right-show-all");
    $record.find(".right-tel").css("display","table");
    $record.find(".right-qq").css("display","table");
    $record.find(".right-record-content .right-title").css("display","table-cell").next().css("display","table-cell");
    $("#records-list").getNiceScroll().resize();//展开详情后resize滚动条高度

}

var list =  {//假数据
    adviceRecordList:[
        {
            "adviceId":"001",
            "advicePeople":"李四",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"池塘边的榕树上知了在声声叫着夏天操场边的秋千上只有蝴蝶停在上面黑板上老师地粉笔还在拼命唧唧喳喳写个不停等待着下课等待着放等待游戏的童年"
        },
        {
            "adviceId":"002",
            "advicePeople":"张三",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"福利社里面什么都有就是口袋里没有半毛钱诸葛四郎和魔鬼党"
        },
        {
            "adviceId":"003",
            "advicePeople":"费四",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"总是要等到睡觉前才知道功课只做了一点点一寸光阴一寸金"
        },
        {
            "adviceId":"003",
            "advicePeople":"费四",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"总是要等到睡觉前才知道功课只做了一点点一寸光阴一寸金"
        },
        {
            "adviceId":"003",
            "advicePeople":"四",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"总是要等到睡觉前才知道功课只做了一点点一寸光阴一寸金"
        },  {
            "adviceId":"003",
            "advicePeople":"费gdgdfrdgrsgsrgrsgw四",
            "adviceDate":"2016.09.13",
            "adviceTel":"1807897897818078978978180789789781807897897818078978978",
            "adviceQQ":"5648979871807897897818078978978180789789781807897897818078978978",
            "adviceText":"总是要等到睡觉前才知道功课只做了一点点一寸光阴一寸金"
        },
        {
            "adviceId":"003",
            "advicePeople":"v四",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"bbhdbfsbfkhdsbfkhdsbvkdbkhbfkhdsbfkshdbfkhdsbvkhdbvkhdbfskhdbfkhdsbfkdshbfkhdbfkdshbvkhdbkshdbvksbds"
        },
        {
            "adviceId":"003",
            "advicePeople":"费四",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"总是要等到睡觉前才知道功课只做了一点点一寸光阴一寸金"
        },  {
            "adviceId":"003",
            "advicePeople":"费四",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"总是要等到睡觉前才知道功课只做了一点点一寸光阴一寸金"
        },
        {
            "adviceId":"003",
            "advicePeople":"费四",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"总是要等到睡觉前才知道功课只做了一点点一寸光阴一寸金"
        },
        {
            "adviceId":"003",
            "advicePeople":"费四",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"总是要等到睡觉前才知道功课只做了一点点一寸光阴一寸金"
        },  {
            "adviceId":"003",
            "advicePeople":"费四",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"总是要等到睡觉前才知道功课只做了一点点一寸光阴一寸金"
        },
        {
            "adviceId":"003",
            "advicePeople":"费四",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"总是要等到睡觉前才知道功课只做了一点点一寸光阴一寸金"
        },
        {
            "adviceId":"003",
            "advicePeople":"费四",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"总是要等到睡觉前才知道功课只做了一点点一寸光阴一寸金"
        },  {
            "adviceId":"003",
            "advicePeople":"费四",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"总是要等到睡觉前才知道功课只做了一点点一寸光阴一寸金"
        },
        {
            "adviceId":"003",
            "advicePeople":"费四",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"总是要等到睡觉前才知道功课只做了一点点一寸光阴一寸金"
        },
        {
            "adviceId":"003",
            "advicePeople":"45678",
            "adviceDate":"2016.09.13",
            "adviceTel":"18078978978",
            "adviceQQ":"564897987",
            "adviceText":"总3是要等到睡觉前才知道功课只做了一点点一寸光阴一寸金"
        }
    ]
};
var startNum = 0;//已加载信息条数
function rightReadRecords(num){//num:一次加载的条数
    // $.ajax({
    //     type : "POST",
    //     url	 : "",
    //     async: true,
    //     success:function(data){
            var data = list;//假数据测试，这行删掉
            if(data){
                var i = startNum;

                for(startNum;startNum<i+num;startNum++){
                    var j = startNum;
                    var record = list.adviceRecordList[startNum];
                     // if(record) {
                        var content = record.adviceText;
                        var length = content.length;
                        var title = "";
                        if (length > 27) {//询团内容若超过27个字则省略显示
                            title = content.substring(0, 27) + "...";
                        } else {
                            title = content;
                        }
                        var $html = '<div class="right-record" style="display:none"  >' +
                            '<div class="right-name-time">' +
                            '<span class="right-title">发信人：</span><span><span class="right-name right-ellipsis">' + record.advicePeople +//发信人
                            '</span></span><span class="right-time">' + record.adviceDate +//时间
                            '</span>' +
                            '</div><div class="right-tel" style="display:none"><span class="right-title">手机号：</span> <span><span class="right-ellipsis">' + record.adviceTel +//手机
                            '</span></span> </div><div class="right-qq" style="display:none"><span class="right-title">qq：</span><span><span class="right-ellipsis">' + record.adviceQQ +//QQ
                            '</span></span></div><div class="right-record-content"><span class="right-title" style="display:none">询团内容：</span><span class="record-content-all" style="display:none">' + record.adviceText +//全部内容
                            '</span><span class="record-content">' + title +//标题
                            '</span></div><div class=" right-more-less right-show-more"onclick="rightShowAll(this)">查看详情<i class="fa fa-angle-double-down" aria-hidden="true"></i></div>' +//查看详情
                            '<div class="right-more-less right-packUp" onclick="rightPackUp(this)" style="display:none">收起<i class="fa fa-angle-double-up" aria-hidden="true"></i></div>' +//收起
                            '</div>';

                        $("#right #add-more").before($html);
                        $(".right-record").slideDown(400);//滑动效果
                        
                        $(".right-ellipsis").each(function(){//
                            var content = $(this).text();
                            $(this).attr("title",content);
                        });

                        if(!list.adviceRecordList[j+1]){//加载完全部数据按钮隐藏

                            $("#add-more").hide();
                            return false;
                        }
                    }
                }
    //      }
    // });
}

