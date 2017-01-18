/**
 * Created by Andrew on 2017/1/12.
 * 尝试获取cnodejs.org社区的第一页东西。以及标题，以及第一条评论
 */
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var url = require('url');//是node的标准模块
var cheerio = require('cheerio');//jQuery

var cnodeUrl = 'https://cnodejs.org';
superagent
    .get(cnodeUrl)
    .end(function (err, res) {
        if (err) {
            return console.error(err)
        }
        var topicUrls = [];
        var $ = cheerio.load(res.text);
        //获取首页所有的链接
        $('#topic_list .topic_title').each(function (index, element) {
            var $element = $(element);
            // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
            // 我们用 url.resolve 来自动推断出完整 url，变成
            // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
            // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
            var href = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(href);
        });
        //参考jQuery 的$.get方法 回调函数的写法
      /*  $.get("http://data1_source", function (data1) {
            //干点啥不？
            $.get("http://data2_source", function (data2) {
                //干点啥不？
                $.get("http://data3_source", function (data3) {
                    //干点啥不？
                    var html = fuck(data1, data2, data3);
                    render(html);
                })
            })
        })*/
        //上面这个做法是同步的，但是实际情况可能存在data2完全不依赖data1的任何操作，data3也不以来data1和data2的操作
        //我们可以并行获取
       /* (function () {
            var count = 0;
            var result = {};
            $.get('http://data1_source', function (data) {
                result.data1 = data;
                count++;
                handle();
            });
            $.get('http://data2_source', function (data) {
                result.data2 = data;
                count++;
                handle();
            });
            $.get('http://data3_source', function (data) {
                result.data3 = data;
                count++;
                handle();
            });
            function handle() {
                if (count === 3) {
                    var html = fuck(result.data1, result.data2, result.data3);
                    render(html);
                }
            }
        })*/
        //丑的一笔，下面用eventproxy来实现，写出来是这个样子的，这个模块的作者好像是深入浅出nodeJs的笔者
      /*  var ep=new eventproxy();
        ep.all('data1_event','data2_event','data3_event',function (data1,data2,data3) {
            var html=fuck(data1,data2,data3);
            render(html);
        })
        $.get('http://data1_source',function (data) {
            ep.emit('data1_event',data);
        })
        $.get('http://data2_source',function (data) {
            ep.emit('data2_event',data);
        })
        $.get('http://data3_source',function (data) {
            ep.emit('data3_event',data);
        })*/
        // 这一句，监听了三个事件，分别是 data1_event, data2_event, data3_event，每次当一个源的数据抓取完成时，就通过 ep.emit() 来告诉 ep 自己，某某事件已经完成了。
        // 当三个事件未同时完成时，ep.emit() 调用之后不会做任何事；当三个事件都完成的时候，就会调用末尾的那个回调函数，来对它们进行统一处理。
        // eventproxy 提供了不少其他场景所需的 API，但最最常用的用法就是以上的这种，即：

        // 先 var ep = new eventproxy(); 得到一个 eventproxy 实例。
        // 告诉它你要监听哪些事件，并给它一个回调函数。ep.all('event1', 'event2', function (result1, result2) {})。
        // 在适当的时候 ep.emit('event_name', eventData)。

        var ep = new eventproxy();
        // 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
        ep.after('topic_html',topicUrls.length,function (topics) {
            // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair
            // 开始行动
            topics=topics.map(function (topicPair) {
                var topicUrl=topicPair[0];
                var topicHtml=topicPair[1];
                var $=cheerio.load(topicHtml);
                return({
                    title:$(".topic_full_title").text().trim(),
                    href: topicUrl,
                    comment1:$('.reply_content').eq(0).text().trim()
                })
            })
            console.log('final:');
            console.log(topics);
        });
        topicUrls.forEach(function (topicUrl) {
            superagent.get(topicUrl)
                .end(function (err,res) {
                    console.log("fetch "+topicUrl+'\b'+'successful');
                    ep.emit('topic_html',[topicUrl,res.text]);
                })
        })
    })








