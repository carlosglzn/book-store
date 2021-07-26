// 1. IMPORTS

const mongoose          = require('mongoose');
const Schema            = mongoose.Schema

// 2. SCHEMA

const productSchema = new Schema(
    {
        name: String,
        author: String,
        imageUrl: String,
        skus: {
            sku: String,
            quantity: Number,
            feature: String
        }
    },
    {
        timestamps: true
    }
)

// 3. MODEL

const Product = mongoose.model('Product', productSchema)

// 4. EXPORTS

module.exports = Product