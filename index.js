// 1. IMPORTS

const express           = require('express')
const connectDB         = require('./config/db')
const bodyparser        = require('body-parser')
const app               = express()

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

// 3. ROUTES


const index = require('./routes/index.routes')
app.use('/', index)

const auth = require('./routes/auth.routes')
app.use('/', auth)

const products = require('./routes/products.routes')
app.use('/', products)


// 4. SERVER

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})