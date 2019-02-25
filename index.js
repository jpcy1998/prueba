const path = require('path');
const express = require('express');
const app = express();

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

  socket.on('disconnect', () => {
    console.log('Se nos fue un makako')
  })
})
