const mongoose = require("mongoose")


const registerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type: String,
        required: true,
        unique : true
    },

    password:{
        type: String,
        required: true
    }
}, timestampes = true)


const Register = new mongoose.model("register", registerSchema);

module.exports = Register;