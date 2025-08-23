const express = require('express')
const path = require('path')
const bcrypt = require("bcrypt")
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const app = express()
const port = 3000

app.use(cookieParser())

const connection = require("./Config/db")
const RegisterModel = require("./Models/register.models")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")

app.get('/', (req, res) => {
  res.render('register')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/pageNotFound', (req, res) => {
  res.render('pageNotFound')
})


app.get('/home', async (req, res) => {

  let token = req.cookies.token;

  if (!token) {
    return res.redirect("/login")
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt_SECRET);
    const user = await RegisterModel.findOne({ email: decoded.email })
    return res.render("home", { name: user.name })
  } catch (error) {
    return res.redirect("/pageNotFound");
  }

})

app.post("/resgiter", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hashSync(password, 10);

  const user = new RegisterModel({
    name,
    email,
    password: hash
  })
  const token = jwt.sign({ email }, process.env.JWT_SECRET)
  res.cookie("token", token)

  await user.save()
  res.redirect("/login")
})


app.post("/login", async (req, res) => {

  let { email, password } = req.body;

  const user = await RegisterModel.findOne({ email })

  if (!user) {
    return res.send("User Not Found!");
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      res.cookie("token", token);
      return res.redirect("/home")
    }
    else {
      return res.redirect("pagenotfound");
    }
  })

})


app.get("/logout", (req, res) => {
  res.cookie("token", "")
  res.redirect("/login")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
