const Product = require('./../models/Product.model')

// GET - /productsAdmin

exports.listProductsAdmin = async (req, res) => {

    Product.find({})
        .then(productsFound => {
            res.render('products/product-list-admin', {
                products: productsFound
            })
        })
        .catch((e) => {
            console.log(e)
        })

}

// GET - /products

exports.listProducts = async (req, res) => {

    Product.find({})
        .then(productsFound => {
            res.render('products/product-list', {
                products: productsFound
            })
        })
        .catch((e) => {
            console.log(e)
        })

}


// GET - /productsAdmin/create

exports.createProduct = async (req, res) => {

    res.render('products/product-create')

}


// POST - /productsAdmin/create

exports.processProduct = async (req, res) => {

    const { name, author, category, price, language, synopsis } = req.body

    Product.create({
        name,
        author,
        category,
        price,
        language,
        synopsis,
        imageUrl: req.file.path
    })
    .then((productCreated) => {
        console.log(productCreated)
        res.redirect('/products')
    })
    .catch((e) => {
        console.log('There was an error creating the product.', e)
    })

}

// GET - /productsAdmin/:id/edit

exports.editProduct = async (req, res) => {

    const { id } = req.params

    Product.findById(id)
        .then((product) => {
            res.render('products/product-edit', product)
        })
        .catch((e) => {
            console.log(e)
        })
}

// POST - /productsAdmin/:id/edit

exports.updateProduct = async (req, res) => {

    const { id } = req.params
    const { name, author, existingImage } = req.body

    let imageUrl

    if (req.file) {
        imageUrl = req.file.path
    } else {
        imageUrl = existingImage
    }

    Product.findByIdAndUpdate(id, { name, author, imageUrl }, {new: true})
        .then(() => {
            res.redirect('/products')
        })
        .catch((e) => {
            console.log(e)
        })

}

// GET - /products/:id

exports.productDetails = async (req, res) => {

    const { id } = req.params

    Product.findById(id)
        .then((productFound) => {
            console.log(productFound)
            res.render('products/product-detail', {
                product: productFound
            })
        })
        .catch((e) => {
            console.log(e)
        })

}