/**
 *
 * @author  56477
 * @create 2018-05-18 13:23
 * @PROJECT_NAME staff - wlj
 * @note scoket .io with express for cross origin test;
 **/
  var app=require('express')();
  var server =require('http').Server(app);
var io = require('socket.io')(server);
server.listen(8090);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
