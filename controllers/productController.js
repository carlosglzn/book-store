const Product = require('./../models/Product.model')

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

// GET - /products/create

exports.createProduct = async (req, res) => {

    res.render('products/product-create')

}


// POST - /products/create

exports.processProduct = async (req, res) => {

    const { name, author } = req.body

    Product.create({
        name,
        author,
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

// GET - /products/:id/edit

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