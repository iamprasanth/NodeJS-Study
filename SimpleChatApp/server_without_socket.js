var express = require('express')
var bodyParser = require('body-parser')
var app = express()

// Specify where the index html is located
// If html is located in a folder '/views' then app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname))

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

app.get('/messages', (req, res) =>{
    res.send(messages)
})

app.post('/messages', (req, res) =>{
    messages.push(req.body)
    res.sendStatus(200)
})

var server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})