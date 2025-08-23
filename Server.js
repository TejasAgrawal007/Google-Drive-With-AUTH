const express = require('express')
const path = require('path')
const bcrypt = require("bcrypt")
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const multer = require("multer")
const app = express()
const port = 3000




app.use(cookieParser())
const connection = require("./Config/db")
const RegisterModel = require("./Models/register.models")




app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")

const mainAUTHroute = require("./Routes/mainAUTH.routes")
const driveRoute = require("./Routes/drive.routes")

app.use("/", mainAUTHroute)
app.use(driveRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
