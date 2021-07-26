// IMPORTS

const mongoose = require ('mongoose')
require('dotenv').config()


// MIDDLEWARE

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true
        })

        console.log("Database connected")

    } catch(e) {

    }
}

// EXPORTS

module.exports = connectDB