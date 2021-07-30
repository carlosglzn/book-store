// 1. IMPORTS

const express           = require('express')
const connectDB         = require('./config/db')
const bodyparser        = require('body-parser')
const app               = express()
const User              = require('./models/User.model')
const mongoose          = require('mongoose')
const stripe            = require('stripe')(process.env.STRIPE_SECRET_KEY)

// RUN ENVIRONMENT VARIABLES

require('dotenv').config()

// 2. MIDDLEWARES

// CONNECTING TO DATABASE

connectDB()

// SET BODY PARSER

app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json())

// SET HBS AS HTML ENGINE

app.set('view engine', 'hbs')

// SESSION

require('./config/session.config')(app);

// STATIC

app.use(express.static('public'));


// LAYOUT MIDDLEWARE

app.use((req, res, next) => {
    
    res.locals.actualUser = req.session.actualUser

    next()

})

app.use((req, res, next) => {
    res.locals.session = req.session

    next()
})



// // CART MIDDLEWARE

// app.use((req, res, next) => {



//     User.findById('610201170bbf5d0b77d93c7a')
//         .then((userInDB) => {

//             console.log('userinDB ', userInDB)

//             req.user = userInDB

//             next()
//         })
//         .catch((e) => {
//             console.log(e)
//         })

// })



// 3. ROUTES


const index = require('./routes/index.routes')
app.use('/', index)

const auth = require('./routes/auth.routes')
app.use('/', auth)

const products = require('./routes/products.routes')
app.use('/', products)

const checkout = require('./routes/checkout.routes')
app.use('/', checkout)


// 4. SERVER

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})