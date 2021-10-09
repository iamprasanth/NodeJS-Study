const EventEmitter = require('events')

const customEmitter = new EventEmitter()

// This event wont be caught because no listener is written yet
customEmitter.emit('response', 'john', 34)

customEmitter.on('response', (name, id) => {
  console.log(`Emit caught and data recieved user ${name} with id:${id}`)
})

customEmitter.on('response', () => {
  console.log('Emit caught without utilising argument')
})

// This event emitted will be caught because as of now two seperate listeneres is written
customEmitter.emit('response', 'john', 34)


// The same idea is used for mongoose, http.createServer etc...

//Eg:
// mongoose.connect(databaseUrl); 

// mongoose.connection.on('connected', function () {  
//     //connected successfully
// }); 

// mongoose.connection.on('error',function (err) {  
//     //connection error
// }); 

// mongoose.connection.on('disconnected', function () {  
//     //disconnected
// });