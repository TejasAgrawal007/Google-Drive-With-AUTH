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

app.get('/home', (req, res) => {
  res.render('home')
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


app.post("/login", async (req, res) => {

  let {email, password} = req.body;

  const user = await LoginModel.find({email})

  if(!user){
    return res.json({message : "User not found"})
  }

  const isMathch = await bcrypt.compare(password, user[0].password);

  if(!isMathch){
    return res.json({message : "Invalid credentials"})
  }

  let loginUser = LoginModel.create({
    email,
    password : user[0].password
  })

  if(loginUser){
      res.redirect("/home")
  }

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
