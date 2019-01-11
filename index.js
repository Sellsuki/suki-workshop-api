const sqlite = require('sqlite')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000
const dbPromise = sqlite.open('./database.sqlite', { Promise: Promise })

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Suki Workshop API: Server is live.')
})

app.get('/users', async (req, res) => {
  try {
    let db = await dbPromise
    let sql = 'SELECT * FROM user'
    let result = await db.all(sql)
    res.send(result)
  } catch (e) {
    console.error(e.message)
    res.send(e.message)
  }
})

app.get('/user/:id', async (req, res) => {
  try {
    let db = await dbPromise
    let sql = `SELECT * FROM user WHERE id = ${req.params.id}`
    let result = await db.get(sql)
    res.send(result)
  } catch (e) {
    console.error(e.message)
    res.send(e.message)
  }
})

app.post('/user', async (req, res) => {
  try {
    let { name, last_name, age, description } = req.body
    let db = await dbPromise
    let sql = `
      INSERT INTO user (name, last_name, age, description)
      VALUES ('${name}', '${last_name}', ${age}, '${description}')
    `
    await db.run(sql)
    res.send({ success: true })
  } catch (e) {
    console.error(e.message)
    res.send(e.message)
  }
})

app.post('/user/:id', async (req, res) => {
  try {
    let { name, last_name, age, description } = req.body
    let db = await dbPromise
    let sql = `
      UPDATE user
      SET name = '${name}', last_name = '${last_name}', age = ${age}, description = '${description}'
      WHERE id = ${req.params.id};
    `
    await db.run(sql)
    res.send({ success: true })
  } catch (e) {
    console.error(e.message)
    res.send(e.message)
  }
})

app.listen(port, () => console.log(`Listening on port ${port}!`))