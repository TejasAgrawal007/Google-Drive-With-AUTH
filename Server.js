const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.set("view engine", "ejs")

app.get('/', (req, res) => {
  res.render('register')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
