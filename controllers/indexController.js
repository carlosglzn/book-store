// IMPORTS

const Product = require('./../models/Product.model')


exports.startHome = async (req, res) => {

    Product.find({})
        .then(productsFound => {
            res.render('index', {
                products: productsFound
            })
        })
        .catch((e) => {
            console.log(e)
        })

}