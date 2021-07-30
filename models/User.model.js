// 1. IMPORTS

const mongoose          = require('mongoose');
const Schema            = mongoose.Schema

// 2. SCHEMA

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            require: [true, 'First Name is required.']
        },
        lastName: {
            type: String,
            require: [true, 'Last Name is required.']
        },
        email: {
            type: String,
            require: [true, 'Email is required.'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Use a valid email address.']
        },
        password: {
            type: String,
            require: [true, 'Password is required.']
        },
        role: {
            type: String
        },
        address: {
            shipping: [{
                country: String,
                street: String,
                city: String,
                state: String,
                zip: Number
            }]
        },
        cart: {
            items: [{
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }],
            totalPrice: Number
        }
    },
    {
        timestamps: true
    }
 
);

// userSchema.methods.addToCart = function(product) {

//     let cart = this.cart

//     if (cart.items.length == 0) {
//         cart.items.push({productId: product._id, quantity: 1})
//         cart.totalPrice = product.price
//     } else {

//         const isExisting = cart.items.findIndex(objInItems => objInItems.productId == product._id)

//         if (isExisting == -1) {
//             cart.items.push({productId: product._id, quantity: 1})
//             cart.totalPrice += product.price
//         } else {
//             existingProductInCart = cart.items[isExisting]
//             existingProductInCart.quantity += 1
//             cart.totalPrice += product.price
//         }
//     }

//     console.log('User in schema: ', this)
//     return this.save()

    

// }


// 3. MODEL

const User = mongoose.model('User', userSchema)

// 4. EXPORTS

module.exports = User