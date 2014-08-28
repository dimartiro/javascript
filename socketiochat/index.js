var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

users = []

var globalRes;

app.get('/', function(req, res){
  res.sendfile('index.html');
  globalRes = res
});

app.get('/login', function(req, res){
  res.sendfile('login.html');
});


io.on('connection', function(socket){

  if(users.indexOf(socket) < 0){
  	console.log("debo ir a login")
  	globalReq.redirect('/login')
  }

  socket.on('login', function(username){
  	socket.username = username
  	users.push(socket)
  	res.sendfile('index.html');
  })

  socket.on('chat message', function(msg){
    io.emit('chat message',socket.username + " Dice: " + msg);
  });

  socket.on('disconnect', function(){
    io.emit('disconnect',socket+" se desconectó");
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});