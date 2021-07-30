// 1. IMPORTS

const express               = require('express')
const router                = express.Router()
const checkoutController    = require('../controllers/checkoutController')


const { isLoggedIn, isLoggedOut} = require('../middleware/route-guard')

// 2. ROUTES


// STRIPE

router.post('/:id/checkout', checkoutController.payment)

router.get('/success', checkoutController.success)

router.get('/cancel', checkoutController.cancel)

// CART ROUTES

// router.get('/cart', checkoutController.startCart)


// router.post('/add-to-cart', checkoutController.addToCart)

// 3. EXPORTS

module.exports = router