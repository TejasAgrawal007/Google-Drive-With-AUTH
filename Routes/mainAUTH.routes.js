const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const route = require('express').Router();

const RegisterModel = require("../Models/register.models")

route.get('/', (req, res) => {
    res.render('register')
})

route.get('/login', (req, res) => {
    res.render('login')
})

route.get('/pageNotFound', (req, res) => {
    res.render('pageNotFound')
})



route.get('/home', async (req, res) => {

    let token = req.cookies.token;

    if (!token) {
        return res.redirect("/login")
    }

    try {
        const decoded = jwt.verify(token, process.env.jwt_SECRET);
        const user = await RegisterModel.findOne({ email: decoded.email })
        const userFolder = `public/uploads/${user.email}`;

        fs.readdir(userFolder, (err, files) => {
            if (err) {
                return res.render("home", { name: user.name, files: [] });
            }
            return res.render("home", { name: user.name, files: files });
        })

    } catch (error) {
        return res.redirect("/pageNotFound");
    }

})

route.post("/resgiter", async (req, res) => {
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


route.post("/login", async (req, res) => {

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


route.get("/logout", (req, res) => {
    res.cookie("token", "")
    res.redirect("/login")
})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Get user email from JWT
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userFolder = `public/uploads/${decoded.email}`;

        if(!fs.existsSync(userFolder)){
            fs.mkdirSync(userFolder, { recursive: true });
        }

        cb(null, userFolder)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

route.post("/upload", upload.single("file"), (req, res) => {
    res.redirect("/home")
})



module.exports = route;