const express = require('express')
const path = require('path')
const bcrypt = require("bcrypt")
const dotenv = require('dotenv').config()
const app = express()
const port = 3000

const connection = require("./Config/db")
const RegisterModel = require("./Models/register.models")
const LoginModel = require("./Models/login.model")

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.set("view engine", "ejs")

app.get('/', (req, res) => {
  res.render('register')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post("/resgiter", async (req, res) => {
    const {name, email, password} = req.body;

    const hash = await bcrypt.hashSync(password, 10);

    const user = new RegisterModel({
        name,
        email,
        password : hash
    })
    await user.save()
    res.redirect("/login")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
