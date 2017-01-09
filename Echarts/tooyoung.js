/**
 * Created by wanglijun on 2016/11/30.
 * 这尼玛太厉害了
 */
window.onload=function () {

    function createPiePic(data){
        var dataType=Object.prototype.toString.call(data).slice(8,-1);

        var option = {
            title: {
                text: '未来一周气温变化',
                subtext: '纯属虚构'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['最高气温','最低气温']
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} °C'
                }
            },
            series: [
                {
                    symbol:"circle",
                    symbolSize:"8",
                    name:'最高气温',
                    type:'line',
                    data:[11, 11, 15, 13, 12, 13, 10],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    itemStyle : {
                        normal : {
                            color:'#f5bf58',
                            label : {
                                show : true,
                                formatter : '{b}：{c}',
                                position : 'top',
                                textStyle : {
                                    fontWeight : '700',
                                    fontSize : '12',
                                    color:'#f5bf58'
                                }
                            },
                            lineStyle:{

                                color:'#f5bf58'
                            }
                        },
                        emphasis:{
                            color:"green",
                            borderWidth:"123",
                            // borderType:"dotted",
                            shadowColor:"blue",
                            opacity:"1"
                        }

                    },
                    lineStyle:{
                        normal:{
                            width:3,
                        }
                    }
                },
                {
                    name:'最低气温',
                    type:'line',
                    data:[1, -2, 2, 5, 3, 2, 0],
                    markPoint: {
                        data: [
                            {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'},
                            [{
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            }, {
                                symbol: 'circle',
                                label: {
                                    normal: {
                                        position: 'start',
                                        formatter: '最大值'
                                    }
                                },
                                type: 'max',
                                name: '最高点'
                            }]
                        ]
                    }
                }
            ]
        };

        if(dataType=="Array"){
            option.series[0].data=data.sort(function (a, b) { return a.value - b.value});
        }
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(option);
    }
    createPiePic();

}
