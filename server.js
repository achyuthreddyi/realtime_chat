const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// set static folder
app.use(express.static(path.join(__dirname,'public')))

// run when client connects
io.on('connection', socket =>{
    // console.log(socket);
    console.log('NEW WEB SOCKET CONNECTION !!!');
    socket.emit('message','welcome to chatcord')

    // BroadCast when a user connects except to the user
    socket.broadcast.emit('message','A user has joined the chat')
    // io.emit('message','A user has joined the chat')

    // Runs when client disconnects
    socket.on('disconnect',() =>{
        io.emit('message','A user has left the meeting')
    })

    // io.emit() all the clients in general

    //listen for chat messge 
    socket.on('chatMessage', (msg) =>{
        io.emit('message',msg)
    })
});


const PORT = 3000 || process.env.PORT;

server.listen(PORT,() => console.log(`server running at ${PORT}`));