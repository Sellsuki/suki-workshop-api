const sqlite = require('sqlite')
const express = require('express')
const bodyParser = require('body-parser')

const app = express().use(bodyParser.json())
const port = 3000

const dbPromise = sqlite.open('./database.sqlite', { Promise: Promise })

app.get('/users', async (req, res) => {
  try {
    let db = await dbPromise
    let result = await db.all('SELECT * FROM user')
    res.send(result)
  } catch (e) {
    console.error(e.message)
    res.send(e.message)
  }
})

app.post('/user', async (req, res) => {
  try {
    res.send(req.body) 
  } catch (e) {
    console.error(e.message)
    res.send(e.message)
  }
})

app.listen(port, () => console.log(`Listening on port ${port}!`))