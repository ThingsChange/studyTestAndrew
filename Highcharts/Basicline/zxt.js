/**
 * Created by wanglijun on 2016/12/16.
 */

/**
 *函数描述
 * @param  {object} options配置参数
 * @param  {String} url   请求的URL
 * @param  {string} dataType  那种数据分析
 * @param {string}  timeInterval 当前表时间区间(今日，本周，本月 全部)
 * @param {string}  displayType 时/天 展示
 */
function createDataNnalysis(options, url, timeInterval, dataTime, displayType) {
    Highcharts.setOptions(options);

}

function createByDisplayType(displayType) {
    return createDataNnalysis.bind(this, displayType);
}
function createBytimeInterval(timeInterval) {
    createDataNnalysis.bind(this, timeInterval);
}
var isNumber = function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}

function toggleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}
$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange',fn);

/*
 function printInfo(name, song) {
 console.log(name + '喜欢的歌曲是: ' + song);
 }
 printInfo('Tom', '七里香');
 printInfo('Jerry', '雅俗共赏');
 对上面的函数进行柯里化之后,我们可以这样写:

 function curryingPrintInfo(name) {
 return function(song) {
 console.log(name + '喜欢的歌曲是: ' + song);
 }
 }
 var tomLike = curryingPrintInfo('Tom');
 tomLike('七里香');
 var jerryLike = curryingPrintInfo('Jerry');
 jerryLike('雅俗共赏');
 */


$(function () {
    Highcharts.setOptions({
        lang: {
            printChart: "打印图表",
            downloadJPEG: "下载 JPEG 图片",
            downloadPDF: "导出为PDF文件",
            downloadPNG: "导出为PNG图片",
            downloadSVG: "导出为SVG文件",
            weekdays: "星期日,星期一,星期二,星期三,星期四,星期五,星期六",
            shortMonths: "一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月"
        }
    })
    $('#container').highcharts({
        chart: {
            inverted: false
        },
        title: {
            // text: 'Chart title',
            text: '<div style="height: 10px;width: 220px;text-align: left; left: 50px;background-color: lightgreen;">本周新增：</div>' +
            '<div style="height: 20px;width: 220px;color:' + '#2196F3' + '; font-size:60px; text-align: center;left: 50px;background-color: lightgreen;">359</div>' +
            '<div style=" background-color: lightgreen;">单</div>' +
            '<div style=" background-color: lightgreen;">增长率：' +
            '<p style="color:red">+20%</p></div>' +
            '<div>时</div>' +
            '<div>天</div>' +
            '<div>对比</div>' +
            '<div><input type="checkbox">上一周</div>' +
            '<div><input type="checkbox">上月周期</div>' +
            '<div>对比</div>',
            y: 0,
            x: -750,
            useHTML: true
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -50
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
});

