// 1. IMPORTS

const express           = require('express')
const router            = express.Router()
const authController    = require('./../controllers/authController')

// 2. ROUTES

// SIGNUP

router.get('/signup', authController.signup)

router.post('/signup', authController.createUser)

// USER PROFILE

router.get('/userprofile', authController.userProfile)

// LOGIN

router.get('/login', authController.login)

router.post('/login', authController.processLogin)

// LOGOUT

router.post('/logout', authController.logout)

//

// 3. EXPORTS

module.exports = router