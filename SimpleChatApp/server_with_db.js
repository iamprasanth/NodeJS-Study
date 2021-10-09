var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

// Specify where the index html is located
// If html is located in a folder '/views' then app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname))
app.use(bodyParser.json()) // If this is not present req.body will be undefined
app.use(bodyParser.urlencoded({ extended: false }))

var dbUrl = 'mongodb://user:user@ds155424.mlab.com:55424/learning-node'
// var dbUrl = "mongodb+srv://user:user@cluster0.vpu6r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

// Return a static html page for about
app.get('/about', (req, res) =>{
    // returns about.html
    res.sendFile(__dirname + "/about.html");
})

// Get all messages
app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) =>{
        res.send(messages)
    })
})

// Posting a new message, save it to messages array
app.post('/messages', (req, res) => {
    var message = new Message(req.body)
    message.save((err) => {
        if (err)
            sendStatus(500)

        io.emit('message', req.body)
        res.sendStatus(200)
    })

})

io.on('connection', (socket) => {
    console.log('a user connected')
})

// Connect to database
mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
    console.log('mongo db connection', err)
})

// Host on localhost port 3000
var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})