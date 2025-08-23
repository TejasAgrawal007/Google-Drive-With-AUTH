const mongoose = require("mongoose")


const connection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.log("MongoDB connection error: ", err);
    });
}

connection();
module.exports = connection;