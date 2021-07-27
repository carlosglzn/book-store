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
        billingAddress: {
            country: String,
            street: String,
            city: String,
            state: String,
            zip: Number
        },
        shippingAddress: {
            country: String,
            street: String,
            city: String,
            state: String,
            zip: Number
        }
    },
    {
        timestamps: true
    }
 
);

// 3. MODEL

const User = mongoose.model('User', userSchema)

// 4. EXPORTS

module.exports = User