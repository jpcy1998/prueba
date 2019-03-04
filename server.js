const path = require('path');
const express = require('express');
const app = express();
var cont = 0

// Serve static files
app.use(express.static(__dirname + '/dist/appsocket'));

// Send all requests to index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/appsocket/index.html'));
});

app.set('port', process.env.PORT || 5000)

// default port
const server = app.listen(app.get('port'), () => {
  console.log('Servidor en', app.get('port'))
});

//socket
const socketIo = require('socket.io')
const io = socketIo(server)

io.on('connection', (socket) => {
  console.log('Nuevo makako conectado')

  io.sockets.on('connection',(socket) => {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room',(room) => {
        socket.join(room);
    });
});

  // cont++
  // io.sockets.emit('contadorUsuarios', (cont))

  socket.on('mensaje:usuario', (data) => {
    var keys = Object.keys( socket.rooms )
    var room=keys[ 0 ]
    console.log(data)
    // console.log(socket.rooms)
    // console.log(keys)
    console.log(room)
    io.sockets.in(room).emit('mensaje:server', data)
  })

  socket.on('mensaje:usuarioEscr', (data) => {
    var keys = Object.keys( socket.rooms )
    var room=keys[ 0 ]
    socket.broadcast.to(room).emit('mensaje:serverEscr', data)
  })

  socket.on('disconnect', () => {
    console.log('Se nos fue un makako')
    // cont--
    // io.sockets.emit('contadorUsuarios', (cont))
  })
})
