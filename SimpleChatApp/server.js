var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

// Specify where the index html is located
// If index html is located in a folder '/views', then app.use(express.static(__dirname + '/views'))
// If start page located in '/views' is to be returned, then app.use(express.static(__dirname + '/views/start.html'))
app.use(express.static(__dirname))

 // To parse body of the json for get functions
app.use(bodyParser.json()) // If this is not present req.body will be undefined
app.use(bodyParser.urlencoded({extended: false}))

var messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'}
]

// Return a static html page for about
app.get('/about', (req, res) =>{
    // returns about.html
    res.sendFile(__dirname + "/about.html");
})

// Get all messages
app.get('/messages', (req, res) =>{
    // return a json arrau of messages
    res.send(messages)
})

// Posting a new message, save it to messages array
app.post('/messages', (req, res) =>{
    // Update messages array
    messages.push(req.body)
    // Emit a signal to front end in real time
    io.emit('message-added', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

var server = http.listen(3000, () => {
    // To host on localhost port 3000
    console.log('server is listening on port', server.address().port)
})