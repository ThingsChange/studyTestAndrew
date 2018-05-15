
/**
 *
 * @author  56477
 * @create 2018-05-08 14:47
 * @note 干什么的呢？
 **/
let koa=require('koa'),
    koaRouter=require('koa-router'),
    request=require('request'),
    fs=require('fs');
let app=new koa(),
    appRouter=new koaRouter();

appRouter.get('/',async ctx=>{
    try{

        const options = {
            url:'https://file.che001.com/fileserver/img?id=6b3b03e7-e403-92ef-6613-6d21765d67e7',
            method: 'get',
            'Content-Range': 'bytes 0-500/1000'
        };
        // request('https://file.chekk.com/fileServer/fileServer/view?id=f1626340-0b06-48e7-8bf9-8aa22b259200').pipe(fs.createWriteStream('doodle.png'))
        let r=request(options,(error,res)=>{
            console.log(error,res,123)
            ctx.body=res
        })
        // let r=request('http://b.hiphotos.baidu.com/image/pic/item/f9198618367adab4c32b570487d4b31c8601e4fa.jpg')


    }catch (ex){
        console.log(ex.message,234)
    }

});
app.use(appRouter.routes(),appRouter.allowedMethods());
app.listen('3333',()=>{
    console.log('server start at 3333')
} )