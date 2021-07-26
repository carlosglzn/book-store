// 1. IMPORTS

const express           = require('express')
const router            = express.Router()

const productController = require('../controllers/productController')
const fileUploader      = require('../config/cloudinary.config')


// 2. ROUTES

router.get('/products', productController.listProducts)

router.get('/products/create', productController.createProduct)

router.post('/products/create', fileUploader.single('product-cover-image'), productController.processProduct)

router.get('/products/:id/edit', productController.editProduct)

router.post('/products/:id/edit', fileUploader.single('product-cover-image'), productController.updateProduct)

// 3. EXPORTS

module.exports = router