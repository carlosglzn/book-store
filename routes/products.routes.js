// 1. IMPORTS

const express           = require('express')
const router            = express.Router()
const productController = require('../controllers/productController')
const fileUploader      = require('../config/cloudinary.config')
const { isLoggedIn, isLoggedOut} = require('../middleware/route-guard')

// 2. ROUTES


// PROUDCTS ADMIN

router.get('/productsAdmin', isLoggedIn, productController.listProductsAdmin)

// PRODUCTS ADMIN CREATE

router.get('/productsAdmin/create', isLoggedIn, productController.createProduct)

router.post('/productsAdmin/create', isLoggedIn, fileUploader.single('product-cover-image'), productController.processProduct)

// PRODUCTS ADMIN EDIT

router.get('/productsAdmin/:id/edit', isLoggedIn, productController.editProduct)

router.post('/productsAdmin/:id/edit', isLoggedIn, fileUploader.single('product-cover-image'), productController.updateProduct)

// PRODUCTS ADMIN DELETE

router.post('/productsAdmin/:id/delete', isLoggedIn, productController.deleteProduct)

// ALL PRODUCTS CLIENT

router.get('/products', productController.listProducts)

// PRODUCT DETAILS

router.get('/products/:id', productController.productDetails)






// 3. EXPORTS

module.exports = router