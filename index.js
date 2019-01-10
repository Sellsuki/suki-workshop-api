const sqlite = require('sqlite')
const express = require('express')
const bodyParser = require('body-parser')

const app = express().use(bodyParser.json())
const port = process.env.PORT || 3000

const dbPromise = sqlite.open('./database.sqlite', { Promise: Promise })

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

app.listen(port, () => console.log(`Listening on port ${port}!`))