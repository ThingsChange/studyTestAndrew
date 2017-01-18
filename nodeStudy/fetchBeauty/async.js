/**
 * Created by Andrew on 2017/1/14.
 */
var async = require('async');
var superagent = require('superagent');
var cheerio=require('cheerio');
var url=require('url');
var cnodeUrl = 'https://cnodejs.org';

/*var concurrencyCount = 0;
var fetchUrl = function (url, callback) {
    var delay = parseInt((Math.random() * 10000000) % 2000, 10);
    concurrencyCount++;
    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
    setTimeout(function () {
        concurrencyCount--;
        callback(null, url + ' html content');
    }, delay);
};

var urls = [];
for (var i = 0; i < 30; i++) {
    urls.push('http://datasource_' + i);
}

async.mapLimit(urls, 5, function (url, callback) {
    fetchUrl(url, callback);
}, function (err, result) {
    console.log('final:');
    console.log(result);
});*/

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
        async.mapLimit(topicUrls, 5, function (url, callback) {
            fetchUrl(url, consoleContent)
        })

    })
var consoleContent=function (html) {
    var $=cheerio.load(html);
    console.log("标题是："+$(".topic_full_title").text().trim()+"\n")
    console.log("作者积分："+$(".big").text().trim()+"\n")
    console.log("第一条评论是："+$(".reply_content ").eq(0).text().trim()+"\n")
}
var concurrencyCount = 0;
var fetchUrl = function (url,callback) {

    console.log();
    concurrencyCount++;

    superagent.get(url)
        .end(function (err,res) {
            console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + 1 + '毫秒');
            concurrencyCount--;
            console.log("fetch "+url+'       '+'successful');
            callback(res.text);
        })
    
}



