/**
 * /signup - GET - isLoggedOut
 * /signup - POST - isLoggedOut
 * /login - GET - isLoggedOut
 * /login - POST - isLoggedOut
 * /logout - POST - isLoggedIn
 * /userprofile - GET - isLoggedIn
 */



const isLoggedIn = (req, res, next) => {
    if (!req.session.actualUser) {
        return res.redirect('/login')
    }

    next()

}

const isLoggedOut = (req, res, next) => {
    if (req.session.actualUser) {
        return res.redirect('/')
    }

    next()

}

const authPage = (permissions) => {
    return (req, res, next) => {
        const userRole = req.body.role

        if (permission.includes(userRole)) {
            next()
        } else {
            return res.status(401).json("You don't have permission!")
        }
    }
}
   


module.exports = {
    isLoggedIn,
    isLoggedOut,
    authPage
}