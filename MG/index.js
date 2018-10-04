var app = require('express')(); //Using the dependancy of express.
var http = require('http').Server(app); //express to launch the server
var io = require('socket.io')(http);
// dependancies begin
http.listen(2345, function() {
  console.log('Listening on *2345');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
}
