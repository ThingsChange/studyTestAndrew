
/**
 * Created by wanglijun on 2016/11/15.
 * 产品的团期信息以日历形式展现
 */
function test(){
    var testData = sessionStorage.getItem("groupDate");
    createGroupDate("2016-01-17", "2016-06-01", '2016-05-25', testData);
}
;(function (window,$) {
    if (!Array.prototype.indexOf)
    {
        Array.prototype.indexOf = function(elt /*, from*/)
        {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++)
            {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    };
    var result = {
        "groupSelected": {
            "groupId": "SBXC123",
            month: "20161117",
            detail: []
        },
        "startToEnd": {
            "startMonth": {"year": "201612"},
            "endMonth": {"year": "201712"}
        },
        "groupDate": [{ //如果detail的长度为0 ，则表示该月份 无团期
            'proOrGroup': 1,//来自于产品点击，还是团期点击  0： 产品，默认展示最近月；1： 是团期点击，默认展示所选团期所在月份的信息
            "month": "201612",
            "detail": [
                {"date": "30", "groupPrice": "￥1234", "freeSeat": -1, "selectedGroup": ""},//余位为-1的显示汉字现询
                {"date": "25", "groupPrice": "￥2345", "freeSeat": 0, "selectedGroup": ""}// selectedGroup  为1的时候 默认选中
            ]
        }, { //如果detail的长度为0 ，则表示该月份 无团期
            'proOrGroup': 1,//来自于产品点击，还是团期点击  0： 产品，默认展示最近月；1： 是团期点击，默认展示所选团期所在月份的信息
            "month": "201611",
            "detail": [
                {"date": "30", "groupPrice": "￥3523", "freeSeat": -1, "selectedGroup": ""},//余位为-1的显示汉字现询
                {"date": "25", "groupPrice": "￥2345", "freeSeat": 0, "selectedGroup": ""}// selectedGroup  为1的时候 默认选中
            ]
        }, {
            'proOrGroup': 0,
            "month": "201701",
            "detail": [
                {"date": "30", "groupPrice": "￥14", "freeSeat": 12, "selectedGroup": ""},
                {"date": "1", "groupPrice": "￥20", "freeSeat": 0, "selectedGroup": ""}
            ]
        }, { //如果detail的长度为0 ，则表示该月份 无团期
            'proOrGroup': 1,//来自于产品点击，还是团期点击  0： 产品，默认展示最近月；1： 是团期点击，默认展示所选团期所在月份的信息
            "month": "201605",
            "detail": [
                {"date": "12", "groupPrice": "￥122334", "freeSeat": -1, "selectedGroup": ""},//余位为-1的显示汉字现询
                {"date": "15", "groupPrice": "￥23445", "freeSeat": 0, "selectedGroup": "1"}// selectedGroup  为1的时候 默认选中
            ]
        }, { //如果detail的长度为0 ，则表示该月份 无团期
            'proOrGroup': 1,//来自于产品点击，还是团期点击  0： 产品，默认展示最近月；1： 是团期点击，默认展示所选团期所在月份的信息
            "month": "201604",
            "detail": [
                {"date": "28", "groupPrice": "￥1234", "freeSeat": -1, "selectedGroup": ""},//余位为-1的显示汉字现询
                {"date": "23", "groupPrice": "￥2345", "freeSeat": 0, "selectedGroup": ""}// selectedGroup  为1的时候 默认选中
            ]
        }]
    }


    sessionStorage.setItem("groupDate", JSON.stringify(result.groupDate));
    sessionStorage.setItem("startToEnd", JSON.stringify(result.startToEnd));
    var testData = sessionStorage.getItem("groupDate");
    var datastartToEnd = sessionStorage.getItem("startToEnd");
    // startToEnd
    var startToEnd = JSON.parse(datastartToEnd);
    var startMonth = startToEnd.startMonth;
    var endMonth = startToEnd.endMonth;


    var ttime = 0;
    var detail;
    var hideTimer;
    var Today = "2016-05-16";
    /*  var tY = Today.getFullYear();
     var tM = Today.getMonth();
     var tD = Today.getDate();
     var tW = Today.getDay();*/
    var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    //判断下当前年份是否为闰年
    function isLeapYear(year) {
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
    }

    //上一个月的月份
    function getLastMonthV(now_m) {
        var last_m;
        if (now_m == 1) {
            last_m = 12;
        } else {
            last_m = now_m - 1;
        }
        return last_m;
    }

    /**
     * 获取当月的天数，上个月的天数，当月第一天星期几以及当月天数
     * 最好能返回一个数组，如果当前月份表日历对应的时间[{lastMD:31,lastMLeft:4},{nowMD:29,nowMLeft:29}]
     * @param date
     */
    function getTheMonthDetail(date) {
        //年份
        var year = date.getFullYear();
        //将日期设定到本月的一号
        var month = date.getMonth() + 1;
        date.setDate(1);
        var week = date.getDay();
        var weeks;
        var constDayOfWeek = [];
        //第一天表格所占格前用上月的尾日填充，算出几天   日历的采用西式显示，每周第一天为周日
        var lastMLeft;
        for (var j = week; j <= 7 + week; j++) {
            if ((j % 7) == 1) {
                weeks = "一";
                lastMLeft = 1;
            } else if ((j % 7) == 2) {
                lastMLeft = 2;
                weeks = "二";
            } else if ((j % 7) == 3) {
                lastMLeft = 3;
                weeks = "三";
            } else if ((j % 7) == 4) {
                lastMLeft = 4;
                weeks = "四";
            } else if ((j % 7) == 5) {
                lastMLeft = 5;
                weeks = "五";
            } else if ((j % 7) == 6) {
                lastMLeft = 6;
                weeks = "六";
            } else if ((j % 7) == 0) {
                weeks = "日";
                lastMLeft = 0;//此处有待继续补充，如果非闰年的2月份，是有可能出现2月的第一天在第二排的第一个值的
            }
            constDayOfWeek.push(weeks);
        }
        date.setMonth(date.getMonth() + 1);
        var lastNowDate = new Date(date - 3600000 * 24);
        date.setMonth(date.getMonth() - 1);
        var lastLastDate = new Date(date - 3600000 * 24);

        //本月的第一个表格应填数字
        var returnObj = [];
        //
        var nextMLeft = 42 - lastMLeft - lastNowDate.getDate();
        var lastMno, nowMno, nextMno;
        if (month == 1) {
            lastMno = year - 1 + "" + 12;
            nowMno = year + "" + month;
            nextMno = year + "" + (month + 1);
        } else if (month > 1 && month < 12) {
            lastMno = year + "" + (month - 1);
            nowMno = year + "" + month;
            nextMno = year + "" + (month + 1);
        } else if (month == 12) {
            lastMno = year + "" + 11;
            nowMno = year + "" + month;
            nextMno = year + 1 + "01";
        }
        lastMno = lastMno.length > 5 ? lastMno : (lastMno.substring(0, 4) + "0" + lastMno.substring(4, 5));
        nowMno = nowMno.length > 5 ? nowMno : (nowMno.substring(0, 4) + "0" + nowMno.substring(4, 5));
        nextMno = nextMno.length > 5 ? nextMno : (nextMno.substring(0, 4) + "0" + nextMno.substring(4, 5));


        returnObj.push(
            {"lastMD": lastLastDate.getDate(), "lastMLeft": lastMLeft, "mNo": lastMno},
            {"nowMD": lastNowDate.getDate(), "nowMLeft": lastNowDate.getDate(), "mNo": nowMno},
            {"nextMD": nextMLeft, "nextMLeft": nextMLeft, "mNo": nextMno}
        )
        return returnObj;
    }

    /**
     * currentDay  需要展示的月份信息 2016-06-01
     * 对得到的周数进行解析
     */
    function analyzeWeeks(currentDay) {
        var _year = Number(currentDay.substring(0, 4));
        var _month = Number(currentDay.substring(5, 7));
        var constantM = _month;
        var weeks = getWeeks(_year, _month);
        var lastMonth = [];
        var nowMonth = [];
        var nextMonth = [];
        var returnArr = {
            "lastMonth": "",
            "nowMonth": "",
            "nextMonth": ""
        };
        for (var i = 0; i < weeks.length; i++) {
            var week = weeks[i];
            for (var j = 0; j < week.length; j++) {
                _month = constantM;
                var day = week[j];
                var tempM = day[1];
                if (_year > day[0]) {
                    _month = _month + 12;
                } else if (_year < day[0]) {
                    tempM = tempM + 12;
                }
                if (_month > tempM) {
                    lastMonth.push(day);
                } else if (_month == tempM) {
                    nowMonth.push(day);
                } else if (_month < tempM) {
                    nextMonth.push(day);
                }

            }
        }
        returnArr.lastMonth = lastMonth;
        returnArr.nowMonth = nowMonth;
        returnArr.nextMonth = nextMonth;
        return returnArr;
    }

    /**
     * 获得周数据
     * @param year  2016
     * month 2   12
     */
    function getWeeks(year, month) {
        var opts = {};
        opts.firstDay = 0;
        var dates = [];
        var lastDay = new Date(year, month, 0).getDate();
        for (var i = 1; i <= lastDay; i++)
            dates.push([year, month, i]);
        // 周数组
        var weeks = [],
            week = [];
        var memoDay = -1;
        while (dates.length > 0) {
            var date = dates.shift();
            week.push(date);//放进数组
            var day = new Date(date[0], date[1] - 1, date[2]).getDay();//判断这天星期几 0 1 2.。。6
            if (memoDay == day) {
                day = 0;
            } else if (day == (opts.firstDay == 0 ? 7 : opts.firstDay) - 1) {
                weeks.push(week);
                week = [];
            }
            memoDay = day;
        }
        if (week.length) {
            weeks.push(week);
        }

        var firstWeek = weeks[0];
        if (firstWeek.length < 7) {
            while (firstWeek.length < 7) {
                var firstDate = firstWeek[0];
                var date = new Date(firstDate[0], firstDate[1] - 1, firstDate[2] - 1)
                firstWeek.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
        } else {
            var firstDate = firstWeek[0];
            var week = [];
            for (var i = 1; i <= 7; i++) {
                var date = new Date(firstDate[0], firstDate[1] - 1, firstDate[2] - i);
                week.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
            weeks.unshift(week);
        }

        var lastWeek = weeks[weeks.length - 1];
        while (lastWeek.length < 7) {
            var lastDate = lastWeek[lastWeek.length - 1];
            var date = new Date(lastDate[0], lastDate[1] - 1, lastDate[2] + 1);
            lastWeek.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
        }
        if (weeks.length < 6) {
            var lastDate = lastWeek[lastWeek.length - 1];
            var week = [];
            for (var i = 1; i <= 7; i++) {
                var date = new Date(lastDate[0], lastDate[1] - 1, lastDate[2] + i);
                week.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
            weeks.push(week);
        }

        return weeks;
    }

    /**
     * 根据月份查出该月的对应产品的团期
     * @param month 月份
     */
    function getMonthDetail(groupDate, month) {
        var j = groupDate.length;
        if (j > 0) {
            for (var i = 0; i < j; i++) {
                if (month == groupDate[i].month) {
                    return groupDate[i].detail;
                }
            }
        }
        return null;
    }


    /**
     * @param lastMLeft 该列表中，该月份出现的天数
     * @param lastM  月份 201611  201609
     * @param lastMD  该月份最后一天
     * @param tempMonthOBJ 有团期的月份
     * @param groupDate 从后台获取的有团期的月份的Json
     * @param whichMonth 那个月  -1，上月   0 本月  1下月
     * @param displayDate 待展示的这个月份
     */
    // function createEveryMonthHtml(lastMLeft,lastM,lastMD,tempMonthOBJ,groupDate,whichMonth){
    function createEveryMonthHtml(theMonth, tempMonthOBJ, groupDate, whichMonth, displayDate) {
        var proOrGro = false;//判断来自于产品的点击还是团期的点击，涉及到所添加月份的位置问题
        var dateHtml = "";
        var monthDetail = [];//月份内的团期列表详细
        var hasGroupFlag = false;
        var mLeftDay = theMonth.length;//月剩余天数
        if (mLeftDay > 0) {
            for (var i = 0; i < mLeftDay; i++) {
                var selectedFlag = false;//如果是团期点击进来的，那么该日子是否为当前默认选中的标识
                // var tempD = lastMD - lastMLeft + 1 + i;
                var _tempHtml = "";
                var t_y = theMonth[i][0];
                var t_m = theMonth[i][1] - 1;
                var t_d = theMonth[i][2];
                var temp_date = new Date(t_y, t_m, t_d);
                var temp_dateForm = formatDate(temp_date, 'yyyyMMdd');
                var temp_m = temp_dateForm.substring(0, 6);
                // tempMonthOBJ=tempMonthOBJ.substring(4,6)
                if ($.inArray(temp_m, tempMonthOBJ) > -1) {//如果上个月中有团期
                    monthDetail = getMonthDetail(groupDate, temp_m);
                    if (monthDetail.length > 0 && whichMonth == 0) {//有团期 并且是当前月
                        hasGroupFlag = true;
                    }
                    if (monthDetail && monthDetail.length > 0) {
                        for (var j = 0; j < monthDetail.length; j++) {
                            if (monthDetail[j].date == t_d) {//说明上个月剩余的那几天有团期
                                if (monthDetail[j].selectedGroup) {//当前选中的团期
                                    selectedFlag = true;
                                    proOrGro = true;//定义的全局变量，确定当前月份是不是为当前选中团期的月份
                                } else {//不是当前选中的额团期
                                    selectedFlag = false;
                                }
                                if (monthDetail[j].freeSeat > 0 && monthDetail[j].freeSeat <= 9) {//说明有余位
                                    _tempHtml += '<p class="p_middle">余:' + monthDetail[j].freeSeat + '</p>';
                                } else if (monthDetail[j].freeSeat == 0) {
                                    _tempHtml += '<p class="p_middle">售罄</p>';
                                } else if (monthDetail[j].freeSeat > 9) {
                                    _tempHtml += '<p class="p_middle">充足</p>';
                                } else if (monthDetail[j].freeSeat == -1) {
                                    _tempHtml += '<p class="p_middle">现询</p>';
                                }
                                _tempHtml += '<p class="p_bottom">' + monthDetail[j].groupPrice + '</p>';
                            }
                        }
                    }
                }
                //根据标志判断当前的日期是否为所点击的日期，如果是，就默认选中 border_orange
                var _borderHtml = _tempHtml ? (selectedFlag ? '<div class="divChild_absolute border_orange "></div></div>' : '<div class="divChild_absolute border_gray " onclick="test()"></div></div>') : '<div class="divChild_absolute "></div></div>';
                if (whichMonth == -1) {
                    dateHtml += '<div class="divChild dc_2 otherMonth"  onclick="test()"><p class="p_top">' + t_d + '</p>' + _tempHtml + _borderHtml;
                } else if (whichMonth == 0) {
                    if (selectedFlag) {
                        dateHtml += '<div class="divChild dc_2 background_orange"  onclick="test()"><p class="p_top">' + t_d + '</p>' + _tempHtml + _borderHtml;
                    } else {
                        dateHtml += '<div class="divChild dc_2"  onclick="test()"><p class="p_top">' + t_d + '</p>' + _tempHtml + _borderHtml;
                    }
                } else if (whichMonth == 1) {
                    dateHtml += '<div class="divChild dc_2 otherMonth"  onclick="test()"> <p class="p_top">' + t_d + '</p>' + _tempHtml + _borderHtml;
                }
            }
        }
        _tempHtml = '';
        var temp_year = theMonth[0][0];
        var temp_month = theMonth[0][1];

        if (whichMonth == 0) {
            if (hasGroupFlag) {
                if (proOrGro) {//如果是团期点击，那么当前月份是为选中月的
                    _tempHtml += '<div id=' + temp_m + ' class="date_top_use active">';
                } else {
                    _tempHtml += '<div id=' + temp_m + ' class="date_top_use">';
                }
                _tempHtml += '<div>' + temp_year + '年' + Number(temp_month) + '月</div>';
                _tempHtml += '<div></div></div>';
            } else {
                _tempHtml += '<div id=' + temp_m + '  class="date_top_use">';
                _tempHtml += '<div>' + temp_year + '年' + Number(temp_month) + '月</div>';
                _tempHtml += '<div>无团期</div></div>';
            }
        }

        $(".date_top_center").append(_tempHtml);
        return dateHtml;
    }

    /**
     *
     * @param tmd 本月日历表的详细天数，第一组数据为上月的，第二组数据为本月的
     * [{lastMD:31,lastMLeft:4,lastM:1},{nowMD:29,nowMLeft:29,nowM:2},{nextMD:9,nextM:3}]
     * {lastMonth:[[2016,4,24],[2016,4,25]..],nowMonth:[[2016,5,1],[2016,5,2]...],nextMonth:[[2016,7,1][2016,7,2][2016,7,3]]};
     *@param displayDate 需要定位的月份  待展示的首页
     * 上月的数据需要灰色字体显示，待修改样式
     * @param data 后台传回来的团期时间什么的
     */
    function createDateTable(tmd, displayDate, data) {
        var dataJson = JSON.parse(data);//数组对象groupDate
        var tempMonthOBJ = [];

        for (var i = 0, j = dataJson.length; i < j; i++) {//防止数据重复
            if (dataJson.length > 0 && tempMonthOBJ.indexOf(dataJson[i].month) == -1) {
                tempMonthOBJ.push(dataJson[i].month);
            }
        }
        var dateHtml = "";
        var dateLastHtml = createEveryMonthHtml(tmd.lastMonth, tempMonthOBJ, dataJson, "-1");
        var dateNowHtml = createEveryMonthHtml(tmd.nowMonth, tempMonthOBJ, dataJson, "0", displayDate);
        var dateNextHtml = createEveryMonthHtml(tmd.nextMonth, tempMonthOBJ, dataJson, "1");
        dateHtml = dateLastHtml + dateNowHtml + dateNextHtml;
        //最好以"201610":"dateHtml"这种形式存起来.
        var temp_m = formatMonth(tmd.nowMonth[0][0], tmd.nowMonth[0][1]);
        var tem_display = displayDate ? (displayDate.substring(0, 4) + displayDate.substring(5, 7)) : "";
        sessionStorage.setItem(temp_m, dateHtml);
        if (tem_display == temp_m) {
            return dateHtml;
        } else {
            return "";
        }
    }

    function formatMonth(y, m) {
        return y + ((m + "").length == 2 ? (m + "") : ("0" + m));
    }

    /**
     *
     * 根据当前团期日期绘画出该月份的日历表
     * @groupDate 所选团期日期
     */
    function drawCalendar(groupDate, displayDate, data) {
        //此处均是测试数据；
        data = testData;
      groupDate="2019-12-23"
        var T_M_D = analyzeWeeks(groupDate);
      console.log('这里是 T_M_D 的结果-------------', groupDate,T_M_D)
        //拼写日历表格
        var dateHtml = createDateTable(T_M_D, displayDate, data);
        $("#divParent").append(dateHtml);
    }

    /**
     * 两种形式，一种点击产品进来，最近的团期月份展示，
     * 另外一种，点击团期进来，默认选中当前团期对应的日期
     * @mark 入口函数
     * 前六个参数均不能省略
     * @param startDate 开始月份//2016-12-03
     * @param endDate 结束月份//2017-12-06
     * @param displayObj 初始化要展示的月份相关信息  如果是点击产品线进来 那么这个值应该和开始月份一样，
     *                   如果是点击团期的话，那么取后台传回来的当前团期时间yyyy-MM-dd
     * @param data      后台返回该产品的所有团期 数据格式如下
     * @param productInfo 所点击的产品的相关信息
     * @param groupInfo 所点击的团期的相关信息
     * {
     *  "displayMonth":"201612","displayDate":"25"
     * }  displayMonth要展示的月份，如果displayDate为“”，那么displayDate为最近的有效期团月
     * eg:201602   0不能省略
     *201
     */
    function createGroupDate(startDate, endDate, displayDate, data, productInfo, groupInfo) {
        //进函数之后先请浏览器的缓存
        var end_y = Number(endDate.substring(0, 4));
        var end_m = Number(endDate.substring(5, 7));
        var start_y = Number(startDate.substring(0, 4));
        var start_m = Number(startDate.substring(5, 7));
        var displayMNo = (end_y - start_y) * 12 + end_m - start_m + 1;
        var displauDate = [];
        var t_c_l = displayMNo;
        var t_y = 0;
        for (var i = start_m; i < t_c_l + start_m; i++) {
            if (i>1&&i % 12 == 1) {//说明换年了
                t_y++;
            }
            var tem_m = ((i % 12 == 0 ? 12 : i % 12) + "").length == 2 ? (i % 12 == 0 ? 12 : i % 12) : "0" + (i % 12 == 0 ? 12 : i % 12);
            displauDate.push((start_y + 1 * t_y) + "-" + tem_m + "-" + "01");
        }
      console.log('这里是 displauDate的结果-------------',displauDate)
        var t_m_n = displauDate.length;
        if (t_m_n > 0) {
            for (var i = 0; i < t_m_n; i++) {
                drawCalendar(displauDate[i], displayDate, data);
            }
        }
        //如果有默认选中的团期，那么确定他所在的月份，让其居中显示
        var $prevAll=$("div.date_top_use.active").prevAll();
        var $nextAll=$("div.date_top_use.active").nextAll();
        if($prevAll.length>=2){//说明前面有不低于两个月份
            $prevAll.eq("1").prevAll().addClass("top_hide");
        }
        if($nextAll.length>=2){
            $nextAll.eq("1").nextAll().addClass("top_hide");
        }
    }

    //测试数据入口
    createGroupDate("2016-01-17", "2016-06-01", '2016-05-25', testData);
    /**
     * 格式化日期
     * @constructor
     */
    function Window_Load() {
        var str = "Tue Jul 16 01:07:00 CST 2013";
        alert(formatCSTDate(str, "yyyy-M-d hh:mm:ss")); //2013-7-16 16:24:58

        alert(formatDate((new Date()), "yyyy-MM-dd")); //2013-07-15
        alert(formatDate((new Date()), "yyyy/M/d")); //2013/7/15
    }

    //格式化CST日期的字串
    function formatCSTDate(strDate, format) {
        return formatDate(new Date(strDate), format);
    }

    //格式化日期,
    function formatDate(date, format) {
        var paddNum = function (num) {
            num += "";
            return num.replace(/^(\d)$/, "0$1");
        }
        //指定格式字符
        var cfg = {
            yyyy: date.getFullYear() //年 : 4位
            , yy: date.getFullYear().toString().substring(2)//年 : 2位
            , M: date.getMonth() + 1  //月 : 如果1位的时候不补0
            , MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
            , d: date.getDate()   //日 : 如果1位的时候不补0
            , dd: paddNum(date.getDate())//日 : 如果1位的时候补0
            , hh: date.getHours()  //时
            , mm: date.getMinutes() //分
            , ss: date.getSeconds() //秒
        }
        format || (format = "yyyy-MM-dd hh:mm:ss");
        return format.replace(/([a-z])(\1)*/ig, function (m) {
            return cfg[m];
        });
    }

    window.createGroupDate=createGroupDate;
    $(".date_top_left").bind("click", function () {
        var activeMonth= $(".date_top_center>.date_top_use.active");
        if (activeMonth.prev().length == 0) {
            return;
        }
        var firstVis=activeMonth.next().next().next().next();
        if (!firstVis.is(".top_hide")){
            firstVis.addClass("top_hide");
            activeMonth.prev().removeClass("top_hide");
        }
        activeMonth.removeClass("active").prev().addClass("active");
        changeMonthDisplay(activeMonth.attr("id"));

    /*    //获取目前显示出来的月份
        var displayTab=$("div.date_top_center>.date_top_use:not(.top_hide)");
        displayTab.each(function(v){
            $(this).hasClass("active");
        })
        displayTab.length;
        var activeMonth= $(".date_top_center>.date_top_use.active");
        var $prev=activeMonth.prevAll();
        var $next=activeMonth.nextAll();
        var prevlen=$prev.length;
        var nextlen=$next.length;
        if (prevlen == 0) {
            return;
        }
        if (prevlen>0){//1  2  N
            if(prevlen>2){
                $prev.eq(2).removeClass("top_hide");
                if(nextlen>=2){
                    $next.eq(1).addClass("top_hide");
                }else{

                }
            }
            activeMonth.removeClass("active").prev().addClass("active");
            changeMonthDisplay(activeMonth.prev().attr("id"));
        }*/
    });
    $(".date_top_right").bind("click", function () {
/*
        var activeMonth= $(".date_top_center>.date_top_use.active");

        $(".date_top_center>.date_top_use :not(:has(top_hide))");





        var $prev=activeMonth.prevAll();
        var $next=activeMonth.nextAll();
        var prevlen=$prev.length;
        var nextlen=$next.length;
        if (nextlen == 0) {
            return;
        }
        if (nextlen>0){//1  2  N
            if(nextlen>2){
                $next.eq(2).removeClass("top_hide");
                if(prevlen>=2){
                    $prev.eq(1).addClass("top_hide");
                }else{

                }
            }
            activeMonth.removeClass("active").next().addClass("active");
            changeMonthDisplay(activeMonth.next().attr("id"));
        }*/

        var activeMonth= $(".date_top_center>.date_top_use.active");
        if (activeMonth.next().length == 0) {
            return;
        }
        var firstVis=activeMonth.prev().prev().prev().prev();
        if (!firstVis.is(".top_hide")){
            firstVis.addClass("top_hide");
            activeMonth.next().removeClass("top_hide");
        }
        activeMonth.removeClass("active").next().addClass("active");
        changeMonthDisplay(activeMonth.attr("id"));
    });
    $(".date_top_use").bind("click", function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        changeMonthDisplay($(this).attr("id"));

    });
    function changeMonthDisplay(displayMonth) {
        if (displayMonth) {
            var displayHtml = sessionStorage.getItem(displayMonth);
        }
        $("#divParent>.divChild.dc_2").remove();
        $("#divParent").append(displayHtml);
    }
})(window,jQuery);
