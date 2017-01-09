/**
 * 我是一只小爬虫
 * Created by wanglijun on 2017/1/6.
 */

var http=require('http');
var cheerio=require('cheerio');
var url='http://www.imooc.com/learn/348';
function filterChapters(html) {
    var $=cheerio.load(html);
    var chapters=$('.chapter');
    /*var chapters=[
        chapterTitle:''
        video:[
            title:'',
            id:
        ]
    ]*/
    var courseData=[];
    chapters.each(function (item) {
        var chapter=$(this);
        var chapterTitle=chapter.find('strong').text().trim();
        console.log(chapterTitle);
        var videos=chapter.find('.video').children('li');
        var chapterData={
            chapterTitle:chapterTitle,
            videos:[]
        }
        videos.each(function (item) {
            var video=$(this).find('.J-media-item');
            var videoTitle=video.text();
            // console.log(video.attr('href').split('video/'));
            var id=video.attr('href').split('video/')[1];
            chapterData.videos.push({
                title:videoTitle,
                id:id
            })
        })
        courseData.push(chapterData);
    })
    return courseData;
}
function printCourseInfo(courseData) {
    // console.log(courseData);
    courseData.forEach(function (item) {
        var chapterTitle=item.chapterTitle;
        console.log(chapterTitle+'\n');
        item.videos.forEach(function(video){
            console.log('   【'+video.id +'】'+ video.title+'\n');
        })
    })
}

http.get(url,function (res) {
    var html='';
    res.on('data',function (data) {
        html+=data;
        // console.log(html);
    })
    res.on('end',function () {
        var courseData=filterChapters(html);
        printCourseInfo(courseData);
    })
}).on('error',function () {
    console.log('获取数据失败');
})