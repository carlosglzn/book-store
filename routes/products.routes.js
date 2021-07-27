// 1. IMPORTS

const express           = require('express')
const router            = express.Router()
const productController = require('../controllers/productController')
const fileUploader      = require('../config/cloudinary.config')
const { isLoggedIn, isLoggedOut, authPage } = require('../middleware/route-guard')

// 2. ROUTES


// PROUDCTS ADMIN

router.get('/productsAdmin', productController.listProductsAdmin)

// PRODUCTS ADMIN CREATE

router.get('/productsAdmin/create', productController.createProduct)

router.post('/productsAdmin/create', fileUploader.single('product-cover-image'), productController.processProduct)

// PRODUCTS ADMIN EDIT

router.get('/productsAdmin/:id/edit', productController.editProduct)

router.post('/productsAdmin/:id/edit', fileUploader.single('product-cover-image'), productController.updateProduct)


// ALL PRODUCTS CLIENT

router.get('/products', productController.listProducts)

// PRODUCT DETAILS

router.get('/products/:id', productController.productDetails)

// 3. EXPORTS

module.exports = router