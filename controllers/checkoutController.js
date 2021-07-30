const stripe            = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Product = require('./../models/Product.model')

exports.payment = async (req, res, next) => {

    const { id } = req.params

    Product.findById(id)
        .then((product) => {
            console.log(product)
        })
        .catch((e) => {
            console.log(e)
        })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 1984,
                        images: ['https://res.cloudinary.com/dfiyofygr/image/upload/v1627440281/bookstore-project/dztoqyrzgzsuwzpj1bbf.jpg']
                    },
                    unit_amount: 1200,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'https://thebookstore-carlosglzn.herokuapp.com/success',
        cancel_url: 'https://thebookstore-carlosglzn.herokuapp.com/cancel'
    })
    
    res.redirect(303, session.url)
}

exports.success = async (req, res) => {
    
    res.render('checkout/success')

}

exports.cancel = async (req, res) => {

    res.render('checkout/cancel')

}