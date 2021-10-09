const { readFile, writeFile } = require('fs').promises
// const { readFile, writeFile } = require('fs')

// When normal fs package is used (without promise) defining a promise returning function
const getText = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// METHOD 1
// Nested then function, to execute one after another
// "Then" can be written to those functions which returns promise
getText('./content/first.txt')
  .then((result) => {
    getText('./content/first.txt')
      .then((result) => {
        writeFile(
          './result-mind-grenade.txt',
          `THIS IS AWESOME : ${first} ${second}`,
          { flag: 'a' }
        )
      })
      .catch((err) => console.log(err))
  })
  .catch((err) => console.log(err))

// METHOD 2, better method
// Async await method instead of repeated nested thens
const start = async () => {
  // Always put await inside try catch otherwise exception will be raised
  try {
    // Here await was
    const first = await getText('./.gitignore')
    // Second will be executed only after first is executed, 
    const second = await getText('./.gitignore')
    // Console log will be executed after sceond is completely executed
    console.log(first, second)
  } catch (error) {
    console.log(error)
  }
}


// METHOD 3, using promise returning fs package
// Async await method instead of repeated nested thens
const start = async () => {
  try {
    // Here await was
    const first = await readFile('./.gitignore', 'utf8')
    // Second will be executed only after first is executed, 
    // ie second wait for the first to complete execution
    const second = await readFile('./.gitignore', 'utf8')
    await writeFile(
      './result-mind-grenade.txt',
      `THIS IS AWESOME : ${first} ${second}`,
      { flag: 'a' }
    )
    console.log(first, second)
  } catch (error) {
    console.log(error)
  }
}

start()