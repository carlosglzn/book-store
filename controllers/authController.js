// IMPORTS

const bcryptjs          = require('bcryptjs')
const mongoose          = require('mongoose')
const User              = require('../models/User.model')


exports.signup = async (req, res) => {
    res.render('auth/signup')
}

exports.createUser = async (req, res) => {
    
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
        
        return res.render("auth/signup", {
            msg: "Error: All fields are mandatory. Please provide your first name, last name, email address and password."
        })
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if (!regex.test(password)) {
        return res.status(500).render("auth/signup", {
            msg: "Error: Password needs to have at least 6 chars and must contain at least one number, one lowecase and one uppercase letter."
        })
    }


    bcryptjs
        .genSalt(10)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            return User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            })
        })
        .catch((e) => {
            console.log(e)
        })
        .then(userCreated => {
            console.log("User created:", userCreated)
            res.redirect('/login')
        })
        .catch(e => {
            if (e instanceof mongoose.Error.ValidationError) {
                res.status(500).render("auth/signup", {
                    msg: "Error: Try a valid email address"
                })
            } else if (e.code === 11000) {
                res.status(500).render("auth/signup", {
                    msg: "Error: This email is already taken. Please try another username."
                })
            }
        })

}

exports.userProfile = async (req, res) => {
    res.render('users/user-profile', { actualUser: req.session.actualUser})
}

exports.login = async (req, res) => {
    res.render('auth/login')
}

exports.processLogin = async (req, res) => {

    console.log('SESSION ===>', req.session)

    const { email, password } = req.body

    if (!email || !password) {
        return res.render('auth/login', {
            msg: 'Error: Please enter both, email and password to login.'
        })
    }

    User.findOne({ email })
        .then((userFound) => {

            if (!userFound) {
                return res.render('auth/login', {
                    msg: 'Error: This email is not registered. Try other email address.'
                })
            }

            const authVerif = bcryptjs.compareSync(password, userFound.password)

            if (!authVerif) {
                return res.render('auth/login', {
                    msg: 'Error: Incorrect password.'
                })
            }

            req.session.actualUser = userFound

            console.log('Updated Session:', req.session)

            return res.redirect('/userprofile')

        })
        .catch((e) => {
            console.log(e)
        })

}

exports.logout = async (req, res) => {
    req.session.destroy(e => {
        if (e) {
            console.log(e)
        }
        res.redirect('/')
    })
}