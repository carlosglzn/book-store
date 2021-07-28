// 1. IMPORTS

const express           = require('express')
const router            = express.Router()
const authController    = require('./../controllers/authController')
const { isLoggedIn, isLoggedOut, authPage } = require('../middleware/route-guard')


// 2. ROUTES

// SIGNUP

router.get('/signup', isLoggedOut, authController.signup)

router.post('/signup', isLoggedOut, authController.createUser)

// USER PROFILE

router.get('/userprofile', isLoggedIn, authController.userProfile)

// LOGIN

router.get('/login', isLoggedOut, authController.login)

router.post('/login', isLoggedOut, authController.processLogin)

// LOGOUT

router.post('/logout', isLoggedIn, authController.logout)

//

// 3. EXPORTS

module.exports = router