// 1. IMPORTS

const express               = require('express')
const router                = express.Router()
const checkoutController    = require('../controllers/checkoutController')
const { isLoggedIn, isLoggedOut, authPage } = require('../middleware/route-guard')

// 2. ROUTES

router.get('/cart', checkoutController.startCart)

// 3. EXPORTS

module.exports = router