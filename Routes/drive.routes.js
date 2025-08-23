const route = require('express').Router();
const multer = require("multer")
const path = require('path');

const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, 'public/uploads')
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