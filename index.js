const PORT = 8080

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server, { serveClient: false });
const cors = require('cors');

app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

let timer

io.on('connection', (socket) => {
  socket.join(socket.id)
  const time = () => {
    const d = new Date();
    socket.emit(socket.id, d.toLocaleTimeString())
  }
  console.log('a user connected')
  timer = setInterval(() => time(), 1000)
  socket.on('disconnect', () => {
    console.log('user disconnected')
    clearInterval(timer)
  })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
  });  

server.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`)
})