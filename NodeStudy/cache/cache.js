/**
 *
 * @author  晴云
 * @create 2021-06-23 0:59
 * @note 干什么的呢？
 **/
import  Koa from "koa"
import path from "path"
import resource from "koa-static"
import  conditional from "koa-conditional-get"
import  etag from "koa-etag"
const app = new Koa();
const host = "localhost"
const port =5999;
// app.use(conditional())
// app.use(etag())

app.use(async (ctx,next)=>{
  ctx.set({
    'Cache-control':'max-age=15'
    // 'Cache-control':'no-cache'
  })
  await next()
})

app.use(resource(path.join(__dirname,'./static')))
app.listen(port,()=>{
  console.log('这里是 server is listen in  的结果-------------', `${host}:${port}`)
})
